import mongoose, { Document, Schema, Types } from "mongoose";

interface IContact extends Document {
	firstName: string;
	lastName?: string;
	email?: string;
	phone: string;
	address?: string;
	avatar?: string;
	createdBy: Types.ObjectId;
	type: string;
	archive?: boolean;
}

const ContactSchema: Schema<IContact> = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, match: /.+\@.+\..+/ },
		phone: {
			type: String,
			required: true,
			match: /^\+?[1-9]\d{1,14}$/,
		},
		address: { type: String },
		avatar: { type: String },
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["payer", "agent"],
			default: "agent",
		},
		archive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
