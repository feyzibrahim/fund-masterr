"use server";

import { AxiosRequest } from "@/lib/axios.instance";
import { revalidatePath } from "next/cache";

export async function updateSheet(formData: FormData, sheetId: string) {
	try {
		await AxiosRequest.patch(`/sheet/update-status/${sheetId}`, formData);
		revalidatePath(`/dashboard/sheets`);
		return { success: true };
	} catch (error: any) {
		console.log("🚀 ~ action.ts:12 ~ updateSheet ~ error:", error);
		return { success: false, error: error.message };
	}
}
