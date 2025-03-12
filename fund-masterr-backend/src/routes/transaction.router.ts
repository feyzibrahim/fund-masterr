import express from "express";
import {
	createTransaction,
	getAllTransactions,
	getTransactionById,
	updateTransaction,
	deleteTransaction,
	updateStatusTransaction,
	getTransactionsStats,
	addFundToLedger,
	updateAgentOfTransaction,
	updatePayerOfTransaction,
} from "../controllers/transaction.controller";

const sheetRouter = express.Router();

sheetRouter.post("/", createTransaction);
sheetRouter.post("/fund", addFundToLedger);
sheetRouter.get("/", getAllTransactions);
sheetRouter.get("/stats", getTransactionsStats);
sheetRouter.get("/:id", getTransactionById);
sheetRouter.patch("/update-status/:id", updateStatusTransaction);
sheetRouter.patch("/agent/:id", updateAgentOfTransaction);
sheetRouter.patch("/payer/:id", updatePayerOfTransaction);
sheetRouter.patch("/:id", updateTransaction);
sheetRouter.delete("/:id", deleteTransaction);

export default sheetRouter;
