import express from "express";
import {
	createContact,
	getAllContacts,
	getContactById,
	updateContact,
	deleteContact,
} from "../controllers/contact.controller";

const contactRouter = express.Router();

contactRouter.post("", createContact);
contactRouter.get("", getAllContacts);
contactRouter.get("/:id", getContactById);
contactRouter.put("/:id", updateContact);
contactRouter.delete("/:id", deleteContact);

export default contactRouter;
