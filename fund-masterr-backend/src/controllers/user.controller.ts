import { Request, Response } from "express";
import User from "../model/user.model";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(400).json({ message: "Error creating user", error });
	}
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error });
	}
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching user", error });
	}
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Return the updated document
			runValidators: true, // Validate the updates against the model schema
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		res.status(400).json({ message: "Error updating user", error });
	}
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting user", error });
	}
};
