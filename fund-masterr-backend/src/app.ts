require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { requireAuth } from "./middleware/requireAuth";
import authRouter from "./routes/auth.router";
import contactRouter from "./routes/contact.router";
import ledgerRouter from "./routes/ledger.router";
import transactionRouter from "./routes/transaction.router";
import userRouter from "./routes/user.router";
import notificationRouter from "./routes/notification.router";

const app = express();

// Mounting necessary middlewares.
app.use(morgan("dev")); // Add morgan middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setting up cors
const allowedOrigins = [process.env.FRONTEND_URL];
const corsOptions = {
	credentials: true,
	origin: function (origin: any, callback: any) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contact", requireAuth, contactRouter);
app.use("/api/ledger", requireAuth, ledgerRouter);
app.use("/api/transaction", requireAuth, transactionRouter);
app.use("/api/user", requireAuth, userRouter);
app.use("/api/notification", requireAuth, notificationRouter);

// Public Api for accessing images
app.use("/api/img", express.static(__dirname + "/public/"));

mongoose
	.connect(process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/fund-masterr")
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
