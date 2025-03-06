import { Request, Response } from "express";
import mongoose from "mongoose";
import Ledger from "../model/ledger.model";
import Sheet from "../model/sheet.model";
import { getStartAndEndDate } from "../util/get-start-and-end-date";
import { getUserIdFromRequest } from "../util/get-user-from-request";
import User from "../model/user.model";
import Contact from "../model/contact.model";

// Create a new Sheet with a transaction and update ledger balances
export const createSheet = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	const session = await mongoose.startSession(); // Start a session
	session.startTransaction(); // Begin the transaction

	try {
		const { amount, status, ledgerId, agent } = req.body;

		let ledgerIds = [ledgerId];

		await Ledger.updateOne(
			{ _id: ledgerId },
			{ $set: { activeToday: true } },
			{ session } // Ensure this update is part of the transaction
		);

		// If agent is provided, check for an existing ledger or create one
		if (agent) {
			const { start, end } = getStartAndEndDate(req, res);

			const existingLedger = await Ledger.findOne(
				{
					contact: agent,
					createdBy: userId,
					createdAt: { $gte: start, $lte: end },
				},
				null,
				{ session } // Use the session
			);

			if (existingLedger) {
				ledgerIds.push(existingLedger._id);
				existingLedger.activeToday = true;
				await existingLedger.save({ session });
			} else {
				const newLedger = new Ledger({
					contact: agent,
					createdBy: userId,
					activeToday: true,
				});
				const savedLedger = await newLedger.save({ session }); // Save within the transaction
				ledgerIds.push(savedLedger._id);
			}
		}

		const newSheet = new Sheet({
			amount,
			status,
			createdBy: userId,
			ledgerIds: ledgerIds,
			agent: agent || null,
		});

		await newSheet.save({ session }); // Save within the transaction

		await session.commitTransaction(); // Commit the transaction
		session.endSession();

		return res.status(201).json(newSheet);
	} catch (error) {
		await session.abortTransaction(); // Rollback the transaction on error
		session.endSession();

		console.error("Error creating sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

// Get all Sheets
export const getAllSheets = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const ledgerId = req.query.ledger;
		const status = req.query.status;

		const query: any = {};

		if (status) {
			query.status = status;
		}

		if (user.role === "payer") {
			if (ledgerId) {
				query.ledgerIds = ledgerId;
			} else {
				const { start, end } = getStartAndEndDate(req, res);
				query.createdAt = { $gte: start, $lte: end };
				query.createdBy = userId;
			}

			const sheets = await Sheet.find(query)
				.sort({
					createdAt: -1,
				})
				.populate("createdBy", "firstName lastName phoneNumber")
				.populate("agent", "firstName lastName phone")
				.populate({
					path: "ledgerIds",
					populate: {
						path: "contact",
					},
				});

			return res.status(200).json(sheets);
		} else {
			const contact = await Contact.findOne({ phone: user.phoneNumber });

			if (!contact) {
				return res
					.status(404)
					.json({ success: false, message: "Contact not found" });
			}

			query.agent = contact._id;
			const { start, end } = getStartAndEndDate(req, res);
			query.createdAt = { $gte: start, $lte: end };

			const sheets = await Sheet.find(query)
				.sort({
					createdAt: -1,
				})
				.populate("createdBy", "firstName lastName phoneNumber")
				.populate("agent", "firstName lastName phone");

			return res.status(200).json(sheets);
		}
	} catch (error) {
		console.error("Error fetching sheets:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

export const getSheetsStats = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const query: any = {};

		if (user.role === "payer") {
			query.createdBy = new mongoose.Types.ObjectId(userId);
		} else {
			const contact = await Contact.findOne({
				$or: [{ phone: user.phoneNumber }, { email: user.email }],
			});

			if (!contact) {
				return res
					.status(404)
					.json({ success: false, message: "Contact not found" });
			}
			query.agent = contact._id;
		}

		// Aggregation to get stats for the last 7 days
		const stats = await Sheet.aggregate([
			{ $match: query },
			{
				$group: {
					_id: {
						day: { $dayOfMonth: "$createdAt" },
						month: { $month: "$createdAt" },
						year: { $year: "$createdAt" },
					},
					totalSheets: { $sum: 1 },
					delivered: {
						$sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] },
					},
					cancelled: {
						$sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
					},
					pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
					totalAmountDelivered: {
						$sum: {
							$cond: [{ $eq: ["$status", "delivered"] }, "$amount", 0],
						},
					},
				},
			},
			{
				$sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
			},
			{
				$limit: 7,
			},
		]);

		const formattedStats = stats.map((stat) => ({
			date: `${stat._id.year}-${stat._id.month}-${stat._id.day}`,
			totalSheets: stat.totalSheets,
			delivered: stat.delivered,
			cancelled: stat.cancelled,
			pending: stat.pending,
			totalAmountDelivered: stat.totalAmountDelivered,
		}));

		// Fill the rest of the days with 0 if there is not enough data for the last 7 days
		while (formattedStats.length < 7) {
			const lastDate =
				formattedStats.length > 0
					? new Date(formattedStats[formattedStats.length - 1].date)
					: new Date();
			lastDate.setDate(lastDate.getDate() - 1);
			formattedStats.push({
				date: `${lastDate.getFullYear()}-${
					lastDate.getMonth() + 1
				}-${lastDate.getDate()}`,
				totalSheets: 0,
				delivered: 0,
				cancelled: 0,
				pending: 0,
				totalAmountDelivered: 0,
			});
		}

		return res.status(200).json(formattedStats);
	} catch (error) {
		console.error("Error fetching sheets stats:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

// Get a single Sheet by ID
export const getSheetById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid ID format" });
		}

		const sheet = await Sheet.findById(id)
			.populate("createdBy", "firstName lastName email")
			.populate("ledgerId", "date oldBalance balance sheetCount lastSheet")
			.populate("assignedTo", "firstName lastName email");

		if (!sheet) {
			return res.status(404).json({ success: false, message: "Sheet not found" });
		}

		return res.status(200).json(sheet);
	} catch (error) {
		console.error("Error fetching sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

// Update a Sheet
export const updateSheet = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { amount, status, assignedTo } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid ID format" });
		}

		const updatedSheet = await Sheet.findByIdAndUpdate(
			id,
			{ amount, status, assignedTo },
			{ new: true, runValidators: true }
		);

		if (!updatedSheet) {
			return res.status(404).json({ success: false, message: "Sheet not found" });
		}

		return res.status(200).json(updatedSheet);
	} catch (error) {
		console.error("Error updating sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};
// Update a Sheet
export const updateStatusSheet = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { status, remarks } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid ID format" });
		}

		const updatedSheet = await Sheet.findByIdAndUpdate(
			id,
			{ status },
			{ new: true, runValidators: true }
		);

		if (!updatedSheet) {
			return res.status(404).json({ success: false, message: "Sheet not found" });
		}

		return res.status(200).json(updatedSheet);
	} catch (error) {
		console.error("Error updating sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

// Delete a Sheet
export const deleteSheet = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid ID format" });
		}

		const deletedSheet = await Sheet.findByIdAndDelete(id);

		if (!deletedSheet) {
			return res.status(404).json({ success: false, message: "Sheet not found" });
		}

		return res.status(200);
	} catch (error) {
		console.error("Error deleting sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};
