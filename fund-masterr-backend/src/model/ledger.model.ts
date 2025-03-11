import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Ledger document
export interface ILedger extends Document {
	contact: mongoose.Types.ObjectId[]; // References to User model
	createdBy: mongoose.Types.ObjectId; // Reference to User model
	balance: number;
	lastUpdated: Date;
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
		balance: {
			type: Number,
			default: 0,
		},
		lastUpdated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true, // Automatically add createdAt and updatedAt fields
	}
);

// Export the Ledger model
const Ledger = mongoose.model<ILedger>("Ledger", LedgerSchema);

export default Ledger;
