import { Request, Response } from "express";
import Ledger from "../model/ledger.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";

// Create a new ledger
export const createLedger = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { contact, oldBalance, balance, sheetCount, lastSheet } = req.body;

		// Parse and normalize date to only compare the day, ignoring time
		const todayStart = new Date();
		todayStart.setHours(0, 0, 0, 0);

		const todayEnd = new Date();
		todayEnd.setHours(23, 59, 59, 999);

		// Check if a ledger already exists for the contact on the given date
		const existingLedger = await Ledger.findOne({
			contact,
			createdAt: { $gte: todayStart, $lte: todayEnd },
		});

		if (existingLedger) {
			return res.status(400).json({
				message: `A ledger already exists for this contact today.`,
			});
		}

		// Create a new ledger
		const newLedger = new Ledger({
			contact,
			createdBy: userId,
			oldBalance,
			balance,
			sheetCount,
			lastSheet,
		});

		const savedLedger = await newLedger.save();
		res.status(201).json(savedLedger);
	} catch (error) {
		res.status(500).json({ message: "Error creating ledger", error });
	}
};

export const getAllLedgers = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		// Check if a date is passed in the query
		const queryDate = req.query.date
			? new Date(req.query.date as string)
			: new Date();

		// Ensure the date is valid
		if (isNaN(queryDate.getTime())) {
			return res.status(400).json({ message: "Invalid date format" });
		}

		// Set start and end of the day for the specified date
		const dayStart = new Date(queryDate);
		dayStart.setHours(0, 0, 0, 0);

		const dayEnd = new Date(queryDate);
		dayEnd.setHours(23, 59, 59, 999);

		// Fetch ledgers based on the date range
		const ledgers = await Ledger.find({
			createdBy: userId,
			createdAt: { $gte: dayStart, $lte: dayEnd },
		}).populate("contact");

		res.status(200).json(ledgers);
	} catch (error) {
		res.status(500).json({ message: "Error fetching ledgers", error });
	}
};

// Get a single ledger by ID
export const getLedgerById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const ledger = await Ledger.findById(id).populate("users");

		if (!ledger) {
			return res.status(404).json({ message: "Ledger not found" });
		}

		res.status(200).json(ledger);
	} catch (error) {
		res.status(500).json({ message: "Error fetching ledger", error });
	}
};

// Update a ledger by ID
export const updateLedger = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { date, users, oldBalance, balance, sheetCount, lastSheet } = req.body;

		const updatedLedger = await Ledger.findByIdAndUpdate(
			id,
			{ date, users, oldBalance, balance, sheetCount, lastSheet },
			{ new: true } // Return the updated document
		).populate("users");

		if (!updatedLedger) {
			return res.status(404).json({ message: "Ledger not found" });
		}

		res.status(200).json(updatedLedger);
	} catch (error) {
		res.status(500).json({ message: "Error updating ledger", error });
	}
};

// Delete a ledger by ID
export const deleteLedger = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedLedger = await Ledger.findByIdAndDelete(id);

		if (!deletedLedger) {
			return res.status(404).json({ message: "Ledger not found" });
		}

		res.status(200).json({ message: "Ledger deleted successfully", deletedLedger });
	} catch (error) {
		res.status(500).json({ message: "Error deleting ledger", error });
	}
};
