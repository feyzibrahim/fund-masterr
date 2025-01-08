import { AxiosRequest } from "@/lib/axios.instance";
import { IFund } from "@/types/fund-types";
import { ILedger } from "@/types/ledger-types";
import { ISheet } from "@/types/sheet-types";

export async function getSheets(
	id: string
): Promise<{ sheets?: ISheet[]; error?: string }> {
	try {
		const sheets = await AxiosRequest.get<ISheet[]>(`/sheet?ledger=${id}`);
		return { sheets };
	} catch (error: any) {
		return {
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}

export async function getFunds(id: string): Promise<{ funds?: IFund[]; error?: string }> {
	try {
		const funds = await AxiosRequest.get<IFund[]>(`/fund?ledgerId=${id}`);
		return { funds };
	} catch (error: any) {
		return {
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}
export async function getLedger(
	id: string
): Promise<{ ledger?: ILedger; error?: string }> {
	try {
		const ledger = await AxiosRequest.get<ILedger>(`/ledger/${id}`);
		return { ledger };
	} catch (error: any) {
		return {
			error: error.message || "An unexpected error occurred. Please try again.",
		};
	}
}
