import express from "express";
import {
	createSheet,
	getAllSheets,
	getSheetById,
	updateSheet,
	deleteSheet,
	updateStatusSheet,
} from "../controllers/sheet.controller";

const sheetRouter = express.Router();

sheetRouter.post("/", createSheet);
sheetRouter.get("/", getAllSheets);
sheetRouter.get("/:id", getSheetById);
sheetRouter.patch("/update-status/:id", updateStatusSheet);
sheetRouter.patch("/:id", updateSheet);
sheetRouter.delete("/:id", deleteSheet);

export default sheetRouter;
