"use server";

import { cookies } from "next/headers";
import { AxiosRequest } from "@/lib/axios.instance";
import { SignupFormValues } from "./components/signup-form";

export async function signup(formData: SignupFormValues) {
	const { email, password, confirmPassword } = formData;

	try {
		const response = await AxiosRequest.post("/auth/signup", {
			email,
			password,
			confirmPassword,
		});

		// cookies().set("auth", "authenticated", { secure: true, httpOnly: true });
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error?.message ?? "Invalid email or password" };
	}
}
