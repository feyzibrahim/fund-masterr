import express from "express";
import {
	createFund,
	getFunds,
	getFundById,
	updateFund,
	deleteFund,
} from "../controllers/fund.controller";

const fundRouter = express.Router();

fundRouter.post("/", createFund);
fundRouter.get("/", getFunds);
fundRouter.get("/:id", getFundById);
fundRouter.put("/:id", updateFund);
fundRouter.delete("/:id", deleteFund);

export default fundRouter;
