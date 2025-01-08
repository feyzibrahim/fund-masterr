import { Request, Response } from "express";
import Fund from "../model/fund.model";
import { getUserIdFromRequest } from "../util/get-user-from-request";

// Create a new fund
export const createFund = async (req: Request, res: Response): Promise<Response> => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { amount, ledgerId } = req.body;

		// Validate required fields
		if (!amount || !ledgerId) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		const newFund = await Fund.create({ amount, addedBy: userId, ledgerId });
		return res.status(201).json(newFund);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Get all funds
export const getFunds = async (req: Request, res: Response): Promise<Response> => {
	try {
		const ledgerId = req.query.ledgerId;

		const query: any = {};

		if (ledgerId) {
			query.ledgerId = ledgerId;
		}

		const funds = await Fund.find(query).populate("addedBy").populate("ledgerId");
		return res.status(200).json(funds);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// Get a single fund by ID
export const getFundById = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const fund = await Fund.findById(id).populate("addedBy").populate("ledgerId");
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
		const { amount, ledgerId } = req.body;

		const updatedFund = await Fund.findByIdAndUpdate(
			id,
			{ amount, ledgerId },
			{ new: true, runValidators: true }
		)
			.populate("addedBy")
			.populate("ledgerId");

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
