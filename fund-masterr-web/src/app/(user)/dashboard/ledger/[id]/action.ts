import { AxiosRequest } from "@/lib/axios.instance";
import { ILedger } from "@/types/ledger-types";
import { ITransaction } from "@/types/transaction-types";

export async function getTransactions(
	id: string
): Promise<{ transactions?: ITransaction[]; error?: string }> {
	try {
		const transactions = await AxiosRequest.get<ITransaction[]>(
			`/transaction?ledger=${id}`
		);
		return { transactions };
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
