import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import User from "../../model/user.model";

// Create a token
const createToken = (_id: string, role: string): string => {
	if (!process.env.SECRET) {
		throw new Error("SECRET is not defined in environment variables");
	}
	return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "1d" });
};

// Sign up a user
const signUpUser = async (req: Request, res: Response): Promise<void> => {
	try {
		let userCredentials = req.body;

		const { email, phoneNumber, password, confirmPassword } = req.body;

		if (!password || !confirmPassword) {
			throw new Error("All fields are required");
		}

		if (password !== confirmPassword) {
			throw new Error("Passwords do not match");
		}

		if (email && !validator.isEmail(email)) {
			throw new Error("Invalid email address");
		}

		if (!validator.isStrongPassword(password)) {
			throw new Error("Password is not strong enough");
		}

		let existingUser = null;

		if (email && validator.isEmail(email)) {
			existingUser = await User.findOne({ email: email });
		} else if (validator.isMobilePhone(phoneNumber)) {
			existingUser = await User.findOne({ phoneNumber: phoneNumber });
		}

		if (existingUser) {
			throw new Error("Email or phone number already in use, please login");
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await User.create({
			...userCredentials,
			password: hash,
			isActive: true,
		});
		if (!user) {
			throw new Error("Failed to create user");
		}

		user.password = ""; // Clear the password before returning

		const token = createToken(user._id, user.role);

		res.status(200).json({ accessToken: token, refreshToken: token });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Log in a user
const loginUser = async (req: Request, res: Response): Promise<void> => {
	const { emailOrPhone, password } = req.body;

	try {
		if (!emailOrPhone || !password) {
			throw new Error("All fields are required");
		}

		let user = null;

		if (validator.isEmail(emailOrPhone)) {
			user = await User.findOne({ email: emailOrPhone });
		} else if (validator.isMobilePhone(emailOrPhone)) {
			user = await User.findOne({ phoneNumber: emailOrPhone });
		}

		if (!user) {
			throw new Error("Email or phone number not registered");
		}

		if (!user.isActive) {
			throw new Error("Account is inactive. Contact support");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error("Incorrect password");
		}

		user.password = "";

		const token = createToken(user._id, user.role);

		res.status(200).json({ accessToken: token, refreshToken: token });
	} catch (error: any) {
		res.status(401).json({ error: error.message });
	}
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

		const { currentPassword, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			throw new Error("Passwords do not match");
		}

		if (!validator.isStrongPassword(password)) {
			throw new Error("New password is not strong enough");
		}

		const user = await User.findById(_id);
		if (!user) {
			throw new Error("User not found");
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) {
			throw new Error("Current password is incorrect");
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		user.password = hash;
		await user.save();

		user.password = "";

		// res.status(200).json({ user, success: true });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

const testApp = async (req: Request, res: Response) => {
	res.status(200).json({ status: "App is perfectly working fine", success: true });
};

export { changePassword, editUser, loginUser, signUpUser, testApp };
