import { Request, Response } from "express";
import Fund from "../model/fund.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";

// Create a new fund
export const createFund = async (req: Request, res: Response): Promise<Response> => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { amount, ledgerIds } = req.body;

		// Validate required fields
		if (!amount || !ledgerIds) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		const newFund = await Fund.create({ amount, addedBy: userId, ledgerIds });
		return res.status(201).json(newFund);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Get all funds
export const getFunds = async (_req: Request, res: Response): Promise<Response> => {
	try {
		const funds = await Fund.find().populate("addedBy").populate("ledgerIds");
		return res.status(200).json(funds);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Get a single fund by ID
export const getFundById = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const fund = await Fund.findById(id).populate("addedBy").populate("ledgerIds");
		if (!fund) {
			return res.status(404).json({ message: "Fund not found." });
		}
		return res.status(200).json(fund);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Update a fund by ID
export const updateFund = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { amount, ledgerIds } = req.body;

		const updatedFund = await Fund.findByIdAndUpdate(
			id,
			{ amount, ledgerIds },
			{ new: true, runValidators: true }
		)
			.populate("addedBy")
			.populate("ledgerIds");

		if (!updatedFund) {
			return res.status(404).json({ message: "Fund not found." });
		}
		return res.status(200).json(updatedFund);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Delete a fund by ID
export const deleteFund = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const deletedFund = await Fund.findByIdAndDelete(id);

		if (!deletedFund) {
			return res.status(404).json({ message: "Fund not found." });
		}
		return res.status(200).json({ message: "Fund deleted successfully." });
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};
