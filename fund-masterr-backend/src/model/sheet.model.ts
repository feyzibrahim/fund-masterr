import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Sheet document
export interface ISheet extends Document {
	amount: number;
	status: "pending" | "delivered" | "cancelled";
	statusChangeLogs: { status: string; timestamp: Date }[];
	createdBy: mongoose.Types.ObjectId; // Reference to User
	ledgerId: mongoose.Types.ObjectId; // Reference to Ledger
	agent: mongoose.Types.ObjectId; // Reference to User
}

// Define the schema for the Sheet model
const SheetSchema: Schema = new Schema(
	{
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: ["pending", "delivered", "cancelled"],
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
		ledgerId: {
			type: Schema.Types.ObjectId,
			ref: "Ledger",
			required: true,
		},
		agent: {
			type: Schema.Types.ObjectId,
			ref: "Contact",
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// Pre-save hook to update statusChangeLogs when status changes
SheetSchema.pre<ISheet>("save", function (next) {
	if (this.isModified("status")) {
		this.statusChangeLogs.push({ status: this.status, timestamp: new Date() });
	}
	next();
});

// Create the Sheet model
const Sheet = mongoose.model<ISheet>("Sheet", SheetSchema);

export default Sheet;
