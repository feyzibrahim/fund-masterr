require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setting up cors
const allowedOrigins = [process.env.CLIENT_URL];
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

// Loading Routes
// import userRoutes from "./routes/user";
// import adminRoutes from "./routes/admin";
// import superAdminRoutes from "./routes/superAdmin";
// import publicRoutes from "./routes/public";

// Auth middleware

// import { requireAuth, requireAdminAuth } from "./middleware/requireAuth";

// Mounting the routes
app.use("/api/auth", authRoutes);
// app.use("/api/user", requireAuth, userRoutes);
// app.use("/api/admin", requireAdminAuth, adminRoutes);
// app.use("/api/super-admin", requireAdminAuth, superAdminRoutes);
// app.use("/api/public", publicRoutes);

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
