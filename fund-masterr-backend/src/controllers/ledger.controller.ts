import { Request, Response } from "express";
import Ledger from "../model/ledger.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";
import { getStartAndEndDate } from "../util/get-start-and-end-date";

// Create a new ledger
export const createLedger = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { contact, oldBalance } = req.body;

		const { start, end } = getStartAndEndDate(req, res);

		// Check if a ledger already exists for the contact on the given date
		const existingLedger = await Ledger.findOne({
			contact,
			createdAt: { $gte: start, $lte: end },
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
		});

		const savedLedger = await newLedger.save();
		res.status(201).json(savedLedger);
	} catch (error) {
		res.status(500).json({ message: "Error creating ledger", error });
	}
};

export const getAllLedgers = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);
	const activeToday = req.query.activeToday;

	try {
		const query: any = {};

		// Check if a date is passed in the query
		const { start, end } = getStartAndEndDate(req, res);

		if (start && end) {
			query.createdAt = { $gte: start, $lte: end };
		}

		if (userId) {
			query.createdBy = userId;
		}

		if (!activeToday) {
			query.activeToday = true;
		}

		const ledgers = await Ledger.find(query)
			.sort({
				createdAt: -1,
			})
			.populate("contact");

		res.status(200).json(ledgers);
	} catch (error) {
		res.status(500).json({ message: "Error fetching ledgers", error });
	}
};

// Get a single ledger by ID
export const getLedgerById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const ledger = await Ledger.findById(id).populate("contact");

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
		const { contact, oldBalance } = req.body;

		const updatedLedger = await Ledger.findByIdAndUpdate(
			id,
			{ contact, oldBalance },
			{ new: true } // Return the updated document
		).populate("contact");

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
