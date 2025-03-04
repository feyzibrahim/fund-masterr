"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./components/login-form";
import { AxiosRequest } from "@/lib/axios.instance";
import { redirectUrls } from "@/lib/constants";
import { getSession } from "@/lib/auth-utils";
import { ILoginBodyTypes, IAuthResponseTypes } from "@/types/auth-types";
import { redirect } from "next/navigation";
import { JWTPayload } from "jose";

export async function login(formData: LoginFormValues) {
	const { emailOrPhone, password } = formData;

	let session: JWTPayload | null;

	try {
		const { accessToken, refreshToken } = await AxiosRequest.post<
			ILoginBodyTypes,
			IAuthResponseTypes
		>("/auth/login", { emailOrPhone, password });

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
