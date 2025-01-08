import express from "express";
import {
	createLedger,
	getAllLedgers,
	getLedgerById,
	updateLedger,
	deleteLedger,
} from "../controllers/ledger.controller";

const ledgerRouter = express.Router();

ledgerRouter.post("/", createLedger);
ledgerRouter.get("/", getAllLedgers);
ledgerRouter.get("/:id", getLedgerById);
ledgerRouter.put("/:id", updateLedger);
ledgerRouter.delete("/:id", deleteLedger);

export default ledgerRouter;
