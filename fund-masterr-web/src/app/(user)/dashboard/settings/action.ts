"use server";
import { AxiosRequest } from "@/lib/axios.instance";
import { INotification } from "@/types/notification-types";
import { IUser } from "@/types/user-types";
import { NotificationsFormValues } from "./components/notifications-form";
import { revalidatePath } from "next/cache";

export async function getUser(): Promise<{ user?: IUser; error?: string }> {
	try {
		const user = await AxiosRequest.get<IUser>(`/user/me`);
		return { user };
	} catch (error: any) {
		return {
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}

export async function getNotification(): Promise<{
	notification?: INotification;
	error?: string;
}> {
	try {
		const notification = await AxiosRequest.get<INotification>(`/notification`);
		return { notification };
	} catch (error: any) {
		return {
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}

export async function updateNotification(
	data: NotificationsFormValues,
	id: string
): Promise<{ success: boolean; error?: string }> {
	try {
		await AxiosRequest.patch(`/notification/${id}`, data);
		revalidatePath("/dashboard/settings/notifications");
		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}
