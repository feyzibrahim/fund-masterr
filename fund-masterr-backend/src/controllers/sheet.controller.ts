import { Request, Response } from "express";
import mongoose from "mongoose";
import Sheet from "../model/sheet.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";
import { getStartAndEndDate } from "../util/get-start-and-end-date";

// Create a new Sheet
export const createSheet = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { amount, status, ledgerId, agent } = req.body;

		const newSheet = new Sheet({
			amount,
			status,
			createdBy: userId,
			ledgerId,
			agent: agent || null,
		});

		await newSheet.save();
		return res.status(201).json(newSheet);
	} catch (error) {
		console.error("Error creating sheet:", error);
		return res.status(500).json({ success: false, message: "Server error", error });
	}
};

// Get all Sheets
export const getAllSheets = async (req: Request, res: Response) => {
	try {
		const ledgerId = req.query.ledger;
		const { start, end } = getStartAndEndDate(req, res);

		const sheets = await Sheet.find({
			ledgerId,
			createdAt: { $gte: start, $lte: end },
		})
			.sort({
				createdAt: -1,
			})
			.populate("createdBy", "firstName lastName phone")
			.populate("agent", "firstName lastName phoneNumber");

		return res.status(200).json(sheets);
	} catch (error) {
		console.error("Error fetching sheets:", error);
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
