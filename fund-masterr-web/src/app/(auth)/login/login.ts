"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./components/login-form";
import { AxiosRequest } from "@/lib/axios.instance";

export async function login(formData: LoginFormValues) {
	const { email, password } = formData;

	try {
		const response = await AxiosRequest.post("/auth/login", { email, password });
		console.log("🚀 ~ file: login.ts:14 ~ login ~ response:", response);

		// cookies().set("auth", "authenticated", { secure: true, httpOnly: true });
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error?.message ?? "Invalid email or password" };
	}
}
