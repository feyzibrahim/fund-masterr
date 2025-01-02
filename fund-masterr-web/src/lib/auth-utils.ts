"use server";

import { cookies } from "next/headers";
import { AxiosRequest } from "./axios.instance";
import { validateJwt } from "./jwt-util";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const refreshToken = async () => {
	const refreshToken = cookies().get("refreshToken")?.value;
	if (!refreshToken) {
		return null;
	}
	await validateJwt(refreshToken);
	const { accessToken } = await AxiosRequest.post<
		{ refreshToken: string },
		{ accessToken: string }
	>("/auth/refresh-token", { refreshToken });
	cookies().set("accessToken", accessToken, { httpOnly: true });
	return accessToken;
};

export const logout = async () => {
	cookies().delete("accessToken");
	cookies().delete("refreshToken");

	redirect("/");
};

export const getSession = async () => {
	const token = await getAccessToken();
	if (!token) {
		return null;
	}
	const data = await validateJwt(token);
	return data;
};

export const getAccessToken = async () => {
	const token = cookies().get("accessToken")?.value;
	console.log("🚀 ~ file: auth-utils.ts:37 ~ getAccessToken ~ token:", token);
	if (!token) {
		return null;
	}
	try {
		const decodedToken = await validateJwt(token);
		if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
			return token;
		} else {
			return refreshToken();
		}
	} catch (e) {
		console.log("error", e);
	}
};
