import { Request, Response } from "express";
import Ledger from "../model/ledger.model";

// Create a new ledger
export const createLedger = async (req: Request, res: Response) => {
	try {
		const { date, users, oldBalance, balance, sheetCount, lastSheet } = req.body;

		const newLedger = new Ledger({
			date,
			users,
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

// Get all ledgers
export const getAllLedgers = async (req: Request, res: Response) => {
	try {
		const ledgers = await Ledger.find().populate("users");
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
