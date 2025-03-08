import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
	user: mongoose.Schema.Types.ObjectId;
	type: "all" | "mentions" | "none";
	mobile?: boolean;
	communication_emails?: boolean;
	marketing_emails?: boolean;
	security_emails: boolean;
}

const NotificationSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	type: { type: String, enum: ["all", "mentions", "none"], required: true },
	mobile: { type: Boolean, default: false },
	communication_emails: { type: Boolean, default: false },
	marketing_emails: { type: Boolean, default: false },
	security_emails: { type: Boolean, default: true },
});

const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification;
