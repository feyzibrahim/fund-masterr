import mongoose, { Document, Schema } from "mongoose";

// Define the user interface
interface IUser extends Document {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	phoneNumber: number;
	role: "agent" | "payer";
	isActive: boolean;
	profileImgURL?: string;
	isEmailVerified?: boolean;
	_id: string;
}

// Define the user schema
const UserSchema: Schema<IUser> = new Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String },
		password: { type: String, required: true },
		phoneNumber: { type: Number },
		role: {
			type: String,
			required: true,
			enum: ["agent", "payer"],
			default: "payer",
		},
		isActive: { type: Boolean, required: true },
		profileImgURL: { type: String },
		isEmailVerified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

// Export the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
