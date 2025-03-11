import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Transaction document
export interface ITransaction extends Document {
	id?: number;
	amount: number;
	message: string;
	type: "sheet" | "fund" | "message";
	status: "pending" | "delivered" | "cancelled" | "none";
	statusChangeLogs: { status: string; timestamp: Date }[];
	createdBy: mongoose.Types.ObjectId; // Reference to User
	ledgerIds: mongoose.Types.ObjectId[]; // Reference to Ledger
	agent: mongoose.Types.ObjectId; // Reference to User
	payer: mongoose.Types.ObjectId; // Reference to User
}

// Define the schema for the Transaction model
const TransactionSchema: Schema = new Schema(
	{
		id: {
			type: Number,
			default: null,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		message: {
			type: String,
		},
		type: {
			type: String,
			enum: ["sheet", "fund", "message"],
			default: "sheet",
		},
		status: {
			type: String,
			enum: ["pending", "delivered", "cancelled", "none"],
			default: "pending",
		},
		statusChangeLogs: [
			{
				status: {
					type: String,
					enum: ["pending", "delivered", "cancelled"],
					required: true,
				},
				timestamp: {
					type: Date,
					required: true,
					default: Date.now,
				},
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		ledgerIds: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ledger",
				required: true,
			},
		],
		agent: {
			type: Schema.Types.ObjectId,
			ref: "Contact",
		},
		payer: {
			type: Schema.Types.ObjectId,
			ref: "Contact",
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// Pre-save hook to update statusChangeLogs when status changes
TransactionSchema.pre<ITransaction>("save", function (next) {
	if (this.isModified("status")) {
		this.statusChangeLogs.push({ status: this.status, timestamp: new Date() });
	}
	next();
});

// Create the Transaction model
const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
