import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Fund document
export interface IFund extends Document {
	amount: number;
	addedBy: mongoose.Types.ObjectId; // Reference to User
	ledgerId: mongoose.Types.ObjectId; // Reference to Ledger
}

// Define the schema for the Fund model
const FundSchema: Schema = new Schema(
	{
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		addedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		ledgerId: {
			type: Schema.Types.ObjectId,
			ref: "Ledger",
			required: true,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// Create the Fund model
const Fund = mongoose.model<IFund>("Fund", FundSchema);

export default Fund;
