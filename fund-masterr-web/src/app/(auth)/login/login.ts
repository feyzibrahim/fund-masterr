"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "./components/login-form";
import { AxiosRequest } from "@/lib/axios.instance";
import { redirectUrls } from "@/lib/constants";
import { getSession } from "@/lib/auth-utils";
import { ILoginBodyTypes, ILoginResponseTypes } from "@/types/auth-types";

export async function login(formData: LoginFormValues) {
	const { email, password } = formData;

	try {
		const { accessToken, refreshToken } = await AxiosRequest.post<
			ILoginBodyTypes,
			ILoginResponseTypes
		>("/auth/login", { email, password });
		cookies().set("accessToken", accessToken, { httpOnly: true });
		cookies().set("refreshToken", refreshToken, { httpOnly: true });
		const session = await getSession();

		return (
			redirectUrls.find((url) => url.role === session?.role)?.defaultUrl ||
			"/not-authorized"
		);
	} catch (error: any) {
		return "/not-authorized";
	}
}
