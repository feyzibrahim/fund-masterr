import express from "express";
import {
	createSheet,
	getAllSheets,
	getSheetById,
	updateSheet,
	deleteSheet,
} from "../controllers/sheet.controller";

const router = express.Router();

router.post("/", createSheet);
router.get("/", getAllSheets);
router.get("/:id", getSheetById);
router.put("/:id", updateSheet);
router.delete("/:id", deleteSheet);

export default router;
