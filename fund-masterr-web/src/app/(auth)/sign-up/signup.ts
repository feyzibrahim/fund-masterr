"use server";

import { cookies } from "next/headers";
import { AxiosRequest } from "@/lib/axios.instance";
import { SignupFormValues } from "./components/signup-form";
import { IAuthResponseTypes, ISignUpBodyTypes } from "@/types/auth-types";

export async function signup(formData: SignupFormValues) {
	const { email, password, confirmPassword, phoneNumber } = formData;

	try {
		const { accessToken, refreshToken } = await AxiosRequest.post<
			ISignUpBodyTypes,
			IAuthResponseTypes
		>("/auth/signup", {
			email,
			phoneNumber,
			password,
			confirmPassword,
		});

		cookies().set("accessToken", accessToken, { httpOnly: true });
		cookies().set("refreshToken", refreshToken, { httpOnly: true });
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error?.message ?? "Invalid email or password" };
	}
}
