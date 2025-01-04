import { Request, Response } from "express";
import Contact from "../model/contactModel";
import { getUserIdFromRequest } from "../util/get-user-from-request";

// Create a new contact
export const createContact = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);

	try {
		const { firstName, lastName, email, phone, address, avatar, type } = req.body;

		// Validate required fields
		if (!firstName || !phone || !userId) {
			return res
				.status(400)
				.json({ message: "First name, phone, and createdBy are required" });
		}

		// Create a new contact
		const contact = new Contact({
			firstName,
			lastName,
			email,
			phone,
			address,
			avatar,
			createdBy: userId,
			type,
		});
		await contact.save();

		res.status(201).json(contact);
	} catch (error) {
		res.status(500).json({ message: "Error creating contact", error });
	}
};

// Get all contacts
export const getAllContacts = async (req: Request, res: Response) => {
	const userId = await getUserIdFromRequest(req);
	const { type } = req.query;
	const query: any = { createdBy: userId };

	if (type && type === "archive") {
		query.archive = true;
	}

	if (type) query.type = type;

	try {
		const contacts = await Contact.find(query);
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ message: "Error fetching contacts", error });
	}
};

// Get a contact by ID
export const getContactById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const contact = await Contact.findById(id).populate(
			"createdBy",
			"firstName email"
		);
		if (!contact) {
			return res.status(404).json({ message: "Contact not found" });
		}

		res.status(200).json(contact);
	} catch (error) {
		res.status(500).json({ message: "Error fetching contact", error });
	}
};

// Update a contact by ID
export const updateContact = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const contact = await Contact.findByIdAndUpdate(id, updates, {
			new: true,
		}).populate("createdBy", "firstName email");
		if (!contact) {
			return res.status(404).json({ message: "Contact not found" });
		}

		res.status(200).json(contact);
	} catch (error) {
		res.status(500).json({ message: "Error updating contact", error });
	}
};

// Delete a contact by ID
export const deleteContact = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const contact = await Contact.findByIdAndDelete(id);
		if (!contact) {
			return res.status(404).json({ message: "Contact not found" });
		}

		res.status(200).json({ message: "Contact deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting contact", error });
	}
};
