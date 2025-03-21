"use server";

import { AxiosRequest } from "@/lib/axios.instance";
import { revalidatePath } from "next/cache";
import { LedgerFormValues } from "./create-ledger-form";
import { SheetFormValues } from "./create-sheet-form";
import { FundFormValues } from "./add-fund-form";

export async function createNewLedger(formData: LedgerFormValues) {
	try {
		await AxiosRequest.post("/ledger", { ...formData });
		revalidatePath(`/dashboard/ledger`);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function deleteLedger(id: string) {
	try {
		await AxiosRequest.delete(`/ledger/${id}`);
		revalidatePath(`/dashboard/ledger`);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function createNewSheet(formData: SheetFormValues, ledgerId: string) {
	try {
		await AxiosRequest.post("/transaction", { ...formData });
		revalidatePath(`/dashboard/transaction/${ledgerId}`);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}

export async function createNewFund(formData: FundFormValues, ledgerId: string) {
	try {
		await AxiosRequest.post("/transaction/fund", { ...formData });
		revalidatePath(`/dashboard/transaction/fund/${ledgerId}`);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
