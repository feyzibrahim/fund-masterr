import { Request, Response } from "express";
import Notification from "../model/notification.model";
import { getUserFromRequest } from "../util/get-user-from-request";
import User from "../model/user.model";

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
	try {
		const notification = new Notification(req.body);
		await notification.save();
		res.status(201).send(notification);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Get all notifications
export const getNotifications = async (req: Request, res: Response) => {
	try {
		const userId = await getUserFromRequest(req);

		let notification = await Notification.findOne({ user: userId });
		if (!notification) {
			const user = await User.findById(userId);
			if (user) {
				const newNotification = new Notification({
					user: user._id,
					type: "all",
					mobile: true,
					communication_emails: true,
					marketing_emails: true,
					security_emails: true,
				});
				await newNotification.save();
				notification = newNotification;
			}
		}
		res.status(200).send(notification);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
	try {
		const notification = await Notification.findById(req.params.id);
		if (!notification) {
			return res.status(404).send();
		}
		res.status(200).send(notification);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update a notification by ID
export const updateNotification = async (req: Request, res: Response) => {
	try {
		const notification = await Notification.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!notification) {
			return res.status(404).send();
		}
		res.status(200).send(notification);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete a notification by ID
export const deleteNotification = async (req: Request, res: Response) => {
	try {
		const notification = await Notification.findByIdAndDelete(req.params.id);
		if (!notification) {
			return res.status(404).send();
		}
		res.status(200).send(notification);
	} catch (error) {
		res.status(500).send(error);
	}
};
