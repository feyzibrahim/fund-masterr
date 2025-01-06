import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/user.model";

interface JwtPayload {
	_id: string;
}

const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(401).json({ error: "Authentication token missing or invalid" });
			return;
		}

		const token = authHeader.split(" ")[1];

		const { _id } = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			throw new Error("Invalid ID!!!");
		}

		const user = await User.findOne({ _id });

		if (!user) {
			throw new Error("Cannot find such a user");
		}

		if (!user.isActive) {
			res.status(401).json({ error: "User is blocked by admin" });
			return;
		}

		next();
	} catch (error: any) {
		res.status(404).json({ error: error.message });
	}
};

const requireAdminAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(401).json({ error: "Authentication token missing or invalid" });
			return;
		}

		const token = authHeader.split(" ")[1];

		const { _id } = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			throw new Error("Invalid ID!!!");
		}

		const user = await User.findOne({ _id });

		if (!user) {
			throw new Error("Cannot find such a user");
		}

		if (!user.isActive) {
			res.status(401).json({ error: "User is blocked by admin" });
			return;
		}

		if (user.role !== "admin") {
			throw new Error("Unauthorized access");
		}

		next();
	} catch (error: any) {
		res.status(404).json({ error: error.message });
	}
};

export { requireAuth, requireAdminAuth };
