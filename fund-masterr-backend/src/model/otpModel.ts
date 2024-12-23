import mongoose, { Schema, Document } from "mongoose";
import { sendOTPMail } from "../util/mailFunction";

// Define an interface for the OTP document
interface IOTP extends Document {
	email: string;
	otp: number;
	createdAt: Date;
}

// Define the schema with type annotations
const otpSchema = new Schema<IOTP>({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // Expires in 5 minutes
	},
});

// Helper function to send verification email
async function sendVerificationEmail(email: string, otp: number): Promise<void> {
	try {
		// await sendOTPMail(email, otp);
	} catch (error) {
		console.error("Error occurred while sending email: ", error);
		throw error;
	}
}

// Middleware to send verification email after a document is saved
otpSchema.pre<IOTP>("save", async function (next) {
	console.log("New document saved to the database");

	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

// Export the model with the defined interface
const OTP = mongoose.model<IOTP>("OTP", otpSchema);
export default OTP;
