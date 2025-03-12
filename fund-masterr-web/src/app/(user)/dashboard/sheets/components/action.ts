"use server";

import { AxiosRequest } from "@/lib/axios.instance";
import { ITransaction } from "@/types/transaction-types";
import { revalidatePath } from "next/cache";

export async function updateSheet(formData: FormData, sheetId: string) {
	try {
		await AxiosRequest.patch(`/transaction/update-status/${sheetId}`, formData);
		revalidatePath(`/dashboard/sheets`);
		return { success: true };
	} catch (error: any) {
		console.log("🚀 ~ action.ts:12 ~ updateSheet ~ error:", error);
		return { success: false, error: error.message };
	}
}

export async function updateAgent(
	transactionId: string,
	data: { agent: string; payer: string },
	type: "agent" | "payer" | "archive"
) {
	try {
		await AxiosRequest.patch<{ agent: string; payer: string }, ITransaction>(
			`/transaction/${type}/${transactionId}`,
			data
		);
		revalidatePath(`/dashboard/sheets`);
		return { success: true };
	} catch (error: any) {
		console.log("🚀 ~ action.ts:12 ~ updateSheet ~ error:", error);
		return { success: false, error: error.message };
	}
}
