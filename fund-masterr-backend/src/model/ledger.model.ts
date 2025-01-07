import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Ledger document
export interface ILedger extends Document {
	contact: mongoose.Types.ObjectId[]; // References to User model
	createdBy: mongoose.Types.ObjectId; // Reference to User model
	oldBalance?: number;
	fund?: number;
	// sheetCount?: number;
	// lastSheet: string;
}

// Define the schema for the Ledger model
const LedgerSchema: Schema = new Schema(
	{
		contact: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Contact",
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		oldBalance: {
			type: Number,
			default: 0,
			min: 0,
		},
		fund: {
			type: Number,
			default: 0,
			min: 0,
		},
		// sheetCount: {
		// 	type: Number,
		// 	min: 0,
		// },
		// lastSheet: {
		// 	type: String,
		// },
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

// Export the Ledger model
const Ledger = mongoose.model<ILedger>("Ledger", LedgerSchema);

export default Ledger;
