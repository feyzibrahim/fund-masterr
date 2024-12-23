import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import OTP from "../../model/otpModel";
import User from "../../model/userModel";
// import { passwordChangedMail, sendOTPMail } from "../../util/mailFunction";

// Sending OTP to email for validation
export const sendOTP = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		if (!email) {
			throw Error("Provide an Email");
		}

		if (!validator.isEmail(email)) {
			throw Error("Invalid Email");
		}

		const user = await User.findOne({ email });

		if (user) {
			throw Error("Email is already registered");
		}

		let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

		const exists = await OTP.findOne({ email });

		if (exists) {
			throw Error("OTP already send");
		}

		await OTP.create({ email, otp });

		res.status(200).json({ success: true, message: "OTP sent Successfully" });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Validating above OTP
export const validateOTP = async (req: Request, res: Response) => {
	const { email, otp } = req.body;

	try {
		const data = await OTP.findOne({ email });

		if (!data) {
			throw Error("OTP expired");
		}

		if (otp !== data.otp) {
			throw Error("OTP is not matched");
		}

		res.status(200).json({
			success: true,
			message: "OTP validation Success",
		});
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Incase the user forget the password can reset after verifying otp
export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			throw Error("Provide an Email");
		}

		if (!validator.isEmail(email)) {
			throw Error("Invalid Email");
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw Error("Email is not Registered");
		}

		const otpExists = await OTP.findOne({ email });

		if (otpExists) {
			await OTP.findOneAndDelete({ _id: otpExists._id });
		}

		let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

		await OTP.create({ email, otp });

		res.status(200).json({ msg: "OTP is send to your email Address", success: true });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Validating forgot OTP
export const validateForgotOTP = async (req: Request, res: Response) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			throw Error("All fields are required");
		}

		if (!validator.isEmail(email)) {
			throw Error("Invalid Email");
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw Error("Email is not Registered");
		}

		const validOTP = await OTP.findOne({ email });

		if (validOTP && otp !== validOTP.otp) {
			throw Error("Wrong OTP. Please Check again");
		}

		res.status(200).json({ success: true, message: "OTP validation Success" });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Setting up new password
export const newPassword = async (req: Request, res: Response) => {
	try {
		const { email, password, passwordAgain } = req.body;

		if (!email || !password || !passwordAgain) {
			throw Error("All fields are required");
		}

		if (!validator.isEmail(email)) {
			throw Error("Invalid Email");
		}

		if (!validator.isStrongPassword(password)) {
			throw Error("Password is not Strong enough");
		}

		if (password !== passwordAgain) {
			throw Error("Passwords are not same");
		}

		const oldUserData = await User.findOne({ email });

		if (oldUserData) {
			const match = await bcrypt.compare(password, oldUserData.password);

			if (match) {
				throw Error("Provide new Password");
			}
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await User.findOneAndUpdate(
			{ email },
			{
				$set: {
					password: hash,
				},
			}
		);

		if (user) {
			try {
				// passwordChangedMail(email);
			} catch (error: any) {
				console.log("Error occurred while sending email: ", error);
				throw error;
			}
		}

		return res.status(200).json({ success: true });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Resending OTP incase the user doesn't receive the OTP
export const resentOTP = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			throw Error("Email is required");
		}

		if (!validator.isEmail(email)) {
			throw Error("Invalid Email");
		}

		const otpData = await OTP.findOne({ email });

		if (!otpData) {
			throw Error("No OTP found in this email. Try again...");
		}

		if (otpData.otp) {
			// sendOTPMail(email, otpData.otp);
		} else {
			throw Error("Cannot find OTP");
		}

		res.status(200).json({ message: "OTP resend successfully", success: true });
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
};
