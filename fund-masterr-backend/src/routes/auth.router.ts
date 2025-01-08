import express from "express";
// import upload from "../middleware/upload";
import { loginUser, signUpUser, testApp } from "../controllers/auth/auth.controller";
import {
	forgotPassword,
	newPassword,
	sendOTP,
	validateForgotOTP,
	validateOTP,
} from "../controllers/auth/otp.controller";

const authRouter = express.Router();

// Auth
authRouter.post("/signup", signUpUser);
authRouter.post("/login", loginUser);
// authRouter.post("/google", loginUsingGoogle);

// Forget Password
authRouter.post("/forget-password", forgotPassword);
authRouter.post("/forget-password-validate-otp", validateForgotOTP);
// Set new password
authRouter.post("/set-new-password", newPassword);

// OTP
authRouter.post("/send-otp", sendOTP);
authRouter.post("/validate-otp", validateOTP);
// authRouter.post("/resend-otp", resendOTP);

authRouter.get("/test-app", testApp);

export default authRouter;
