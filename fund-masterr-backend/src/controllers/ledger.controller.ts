import { Request, Response } from "express";
import Ledger from "../model/ledger.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";
import { getStartAndEndDate } from "../util/get-start-and-end-date";
import { createTransactionWithoutRequest } from "./transaction.controller";
import mongoose from "mongoose";

// Create a new ledger with session transaction
export const createLedger = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);
	const session = await mongoose.startSession();
	session.startTransaction(); // Start the session transaction

	try {
		const { contact, balance } = req.body;

		// Check if a ledger already exists for the contact
		const existingLedger = await Ledger.findOne({ contact }).session(session);

		if (existingLedger) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({
				message: `A ledger already exists for this contact.`,
			});
		}

		// Create a new ledger
		const newLedger = new Ledger({
			contact,
			createdBy: userId,
			balance,
			lastUpdated: new Date(),
		});

		const savedLedger = await newLedger.save({ session });

		if (newLedger && balance) {
			await createTransactionWithoutRequest(
				{
					createdBy: userId,
					amount: balance,
					type: "fund",
					status: "none",
					ledgerIds: [newLedger._id as string],
				},
				session
			);
		}

		await session.commitTransaction(); // Commit the transaction
		session.endSession();

		res.status(201).json(savedLedger);
	} catch (error) {
		await session.abortTransaction(); // Rollback changes if any error occurs
		session.endSession();
		res.status(500).json({ message: "Error creating ledger", error });
	}
};

export const getAllLedgers = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);
	const activeToday = req.query.activeToday;
	const type = req.query.type; // Get the type from query parameters

	try {
		const query: any = {};

		if (userId) {
			query.createdBy = userId;
		}

		if (activeToday !== "false") {
			const { start, end } = getStartAndEndDate(req, res);
			query.lastUpdated = { $gte: start, $lte: end };
		}

		const ledgers = await Ledger.find(query)
			.sort({ createdAt: -1 })
			.populate({
				path: "contact",
				match: type ? { type } : {}, // Add match condition here
			});

		// Filter out ledgers with no matching contacts
		const filteredLedgers = ledgers.filter((ledger) => ledger.contact);

		res.status(200).json(filteredLedgers);
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
