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

const router = express.Router();

// Auth
router.post("/signup", signUpUser);
router.post("/login", loginUser);
// router.post("/google", loginUsingGoogle);

// Forget Password
router.post("/forget-password", forgotPassword);
router.post("/forget-password-validate-otp", validateForgotOTP);
// Set new password
router.post("/set-new-password", newPassword);

// OTP
router.post("/send-otp", sendOTP);
router.post("/validate-otp", validateOTP);
// router.post("/resend-otp", resendOTP);

router.post("/test-app", testApp);

export default router;
