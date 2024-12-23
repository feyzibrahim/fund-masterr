import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Define the user interface
interface IUser extends Document {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	phoneNumber?: number;
	dateOfBirth?: Date;
	role: "user" | "admin" | "superAdmin";
	isActive: boolean;
	profileImgURL?: string;
	isEmailVerified: boolean;
	_id: string;
}

// Define static methods interface
interface IUserModel extends Model<IUser> {
	signup(
		userCredentials: Partial<IUser> & { passwordAgain: string },
		role: "user" | "admin" | "superAdmin",
		isEmailVerified: boolean
	): Promise<Omit<IUser, "password">>;

	login(email: string, password: string): Promise<Omit<IUser, "password">>;

	changePassword(
		_id: string,
		currentPassword: string,
		newPassword: string,
		passwordAgain: string
	): Promise<Omit<IUser, "password">>;
}

// Define the user schema
const UserSchema: Schema<IUser> = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		phoneNumber: { type: Number },
		dateOfBirth: { type: Date },
		role: {
			type: String,
			required: true,
			enum: ["user", "admin", "superAdmin"],
		},
		isActive: { type: Boolean, required: true },
		profileImgURL: { type: String },
		isEmailVerified: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

// Static methods

// UserSchema.statics.signup = async function (
// 	this: IUserModel,
// 	userCredentials: Partial<IUser> & { passwordAgain: string },
// 	role: "user" | "admin" | "superAdmin",
// 	isEmailVerified: boolean
// ): Promise<Omit<IUser, "password">> {
// 	const { email, password, passwordAgain, firstName, lastName } = userCredentials;

// 	if (!firstName || !lastName || !email || !password || !passwordAgain || !role) {
// 		throw new Error("All fields are required");
// 	}

// 	if (firstName.trim() === "" || lastName.trim() === "") {
// 		throw new Error("First and last name cannot be empty");
// 	}

// 	if (password !== passwordAgain) {
// 		throw new Error("Passwords do not match");
// 	}

// 	if (!validator.isEmail(email)) {
// 		throw new Error("Invalid email address");
// 	}

// 	if (!validator.isStrongPassword(password)) {
// 		throw new Error("Password is not strong enough");
// 	}

// 	const existingUser = await this.findOne({ email });
// 	if (existingUser) {
// 		throw new Error("Email already in use");
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	const hash = await bcrypt.hash(password, salt);

// 	const user = await this.create({
// 		...userCredentials,
// 		password: hash,
// 		role,
// 		isActive: true,
// 		isEmailVerified,
// 	});

// 	user.password = ""; // Clear the password before returning
// 	return user.toObject();
// };

// UserSchema.statics.login = async function (
// 	this: IUserModel,
// 	email: string,
// 	password: string
// ): Promise<Omit<IUser, "password">> {
// 	if (!email || !password) {
// 		throw new Error("All fields are required");
// 	}

// 	if (!validator.isEmail(email)) {
// 		throw new Error("Invalid email address");
// 	}

// 	const user = await this.findOne({ email });
// 	if (!user) {
// 		throw new Error("Email not registered");
// 	}

// 	if (!user.isActive) {
// 		throw new Error("Account is inactive. Contact support");
// 	}

// 	const isMatch = await bcrypt.compare(password, user.password);
// 	if (!isMatch) {
// 		throw new Error("Incorrect password");
// 	}

// 	user.password = ""; // Clear the password before returning
// 	return user.toObject();
// };

// UserSchema.statics.changePassword = async function (
// 	this: IUserModel,
// 	_id: string,
// 	currentPassword: string,
// 	newPassword: string,
// 	passwordAgain: string
// ): Promise<Omit<IUser, "password">> {
// 	if (newPassword !== passwordAgain) {
// 		throw new Error("Passwords do not match");
// 	}

// 	if (!validator.isStrongPassword(newPassword)) {
// 		throw new Error("New password is not strong enough");
// 	}

// 	const user = await this.findById(_id);
// 	if (!user) {
// 		throw new Error("User not found");
// 	}

// 	const isMatch = await bcrypt.compare(currentPassword, user.password);
// 	if (!isMatch) {
// 		throw new Error("Current password is incorrect");
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	const hash = await bcrypt.hash(newPassword, salt);

// 	user.password = hash;
// 	await user.save();

// 	user.password = ""; // Clear the password before returning
// 	return user.toObject();
// };

// Export the User model
const User: IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
