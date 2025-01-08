import express from "express";
import {
	createSheet,
	getAllSheets,
	getSheetById,
	updateSheet,
	deleteSheet,
} from "../controllers/sheet.controller";

const sheetRouter = express.Router();

sheetRouter.post("/", createSheet);
sheetRouter.get("/", getAllSheets);
sheetRouter.get("/:id", getSheetById);
sheetRouter.put("/:id", updateSheet);
sheetRouter.delete("/:id", deleteSheet);

export default sheetRouter;
