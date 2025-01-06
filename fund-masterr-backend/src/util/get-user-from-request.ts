import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/user.model";

export const getUserFromRequest = async (req: Request) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Error("Unauthorized");
	}

	const token = authHeader.split(" ")[1];

	const { _id } = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		throw new Error("Invalid ID!!!");
	}

	const user = await User.findOne({ _id });

	return user;
};

export const getUserIdFromRequest = async (req: Request): Promise<string> => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Error("Unauthorized");
	}

	const token = authHeader.split(" ")[1];

	const { _id } = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

	return _id;
};
