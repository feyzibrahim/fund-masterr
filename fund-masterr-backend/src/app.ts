require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import ledgerRoutes from "./routes/ledger";
import { requireAuth } from "./middleware/requireAuth";

const app = express();

// Mounting necessary middlewares.
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

// Auth middleware

// import { requireAuth, requireAdminAuth } from "./middleware/requireAuth";

app.use("/api/auth", authRoutes);
app.use("/api/contact", requireAuth, contactRoutes);
app.use("/api/ledger", requireAuth, ledgerRoutes);

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
