import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../../model/userModel";

// Create a token
const createToken = (_id: string): string => {
	if (!process.env.SECRET) {
		throw new Error("SECRET is not defined in environment variables");
	}
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Cookie configuration
const cookieConfig = {
	secure: true,
	httpOnly: true,
	maxAge: 1000 * 60 * 60 * 24,
};

// Get user data on initial page load
const getUserDataFirst = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.cookies.user_token;
		if (!token) {
			throw new Error("No token found");
		}

		const { _id } = jwt.verify(token, process.env.SECRET as string) as {
			_id: string;
		};

		const user = await User.findOne({ _id }, { password: 0 });
		if (!user) {
			throw new Error("Cannot find user");
		}

		res.status(200).json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Sign up a user
const signUpUser = async (req: Request, res: Response): Promise<void> => {
	try {
		let userCredentials = req.body;
		// const profileImgURL = req?.file?.filename;

		// if (profileImgURL) {
		// 	userCredentials = { ...userCredentials, profileImgURL };
		// }

		const user = await User.signup(userCredentials, "user", true);

		if (!user) {
			throw new Error("Failed to create user");
		}

		const token = createToken(user._id);

		res.cookie("user_token", token, cookieConfig);

		res.status(200).json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Log in a user
const loginUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);

		const token = createToken(user._id);

		res.cookie("user_token", token, cookieConfig);

		res.status(200).json(user);
	} catch (error: any) {
		res.status(401).json({ error: error.message });
	}
};

// Log out a user
const logoutUser = async (req: Request, res: Response): Promise<void> => {
	res.clearCookie("user_token");
	res.status(200).json({ msg: "Logged out Successfully" });
};

// Edit user details
const editUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.cookies.user_token;

		const { _id } = jwt.verify(token, process.env.SECRET as string) as {
			_id: string;
		};

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			throw new Error("Invalid ID!!!");
		}

		let formData = req.body;
		// const profileImgURL = req?.file?.filename;

		// if (profileImgURL) {
		// 	formData = { ...formData, profileImgURL };
		// }

		const updatedUser = await User.findOneAndUpdate(
			{ _id },
			{ $set: { ...formData } },
			{ new: true }
		);

		if (!updatedUser) {
			throw new Error("No such User");
		}

		const user = await User.findOne({ _id }, { password: 0 });

		res.status(200).json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Change user password
const changePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.cookies.user_token;

		const { _id } = jwt.verify(token, process.env.SECRET as string) as {
			_id: string;
		};

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			throw new Error("Invalid ID!!!");
		}

		const { currentPassword, password, passwordAgain } = req.body;

		const user = await User.changePassword(
			_id,
			currentPassword,
			password,
			passwordAgain
		);

		res.status(200).json({ user, success: true });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export { getUserDataFirst, signUpUser, loginUser, logoutUser, editUser, changePassword };
