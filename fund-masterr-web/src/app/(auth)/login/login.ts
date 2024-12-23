"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./components/LoginForm";

export async function login(formData: LoginFormValues) {
	const { email, password } = formData;

	// Here you would typically validate the credentials against your database
	// This is a mock authentication for demonstration purposes
	if (email === "user@example.com" && password === "password") {
		// Set a cookie or token for authentication
		cookies().set("auth", "authenticated", { secure: true, httpOnly: true });
		return { success: true };
	} else {
		return { success: false, error: "Invalid email or password" };
	}
}
