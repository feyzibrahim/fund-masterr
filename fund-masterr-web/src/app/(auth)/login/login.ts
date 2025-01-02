"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./components/login-form";
import { AxiosRequest } from "@/lib/axios.instance";
import { redirectUrls } from "@/lib/constants";
import { getSession } from "@/lib/auth-utils";
import { ILoginBodyTypes, ILoginResponseTypes } from "@/types/auth-types";
import { redirect } from "next/navigation";
import { JWTPayload } from "jose";

export async function login(formData: LoginFormValues) {
	const { email, password } = formData;

	let session: JWTPayload | null;

	try {
		const { accessToken, refreshToken } = await AxiosRequest.post<
			ILoginBodyTypes,
			ILoginResponseTypes
		>("/auth/login", { email, password });
		cookies().set("accessToken", accessToken, { httpOnly: true });
		cookies().set("refreshToken", refreshToken, { httpOnly: true });
		session = await getSession();
	} catch (error: any) {
		throw Error(error);
	}

	if (session) {
		redirect(
			redirectUrls.find((url) => url.role === session?.role)?.defaultUrl ||
				"/not-authorized"
		);
	}
}
