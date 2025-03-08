import {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	getUserById,
	updateUser,
} from "../controllers/user.controller";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", createUser); // Create user
userRouter.get("/", getAllUsers); // Get all
userRouter.get("/me", getUser); // Get all
userRouter.get("/:id", getUserById); // Get user by ID
userRouter.patch("/:id", updateUser); // Update user by ID
userRouter.delete("/:id", deleteUser); // Delete user by ID

export default userRouter;
