import { AxiosRequest } from "@/lib/axios.instance";
import { ILedger } from "@/types/ledger-types";
import { ITransaction } from "@/types/transaction-types";

export async function getTransactions(
	id: string,
	date?: string
): Promise<{ transactions?: ITransaction[]; error?: string }> {
	try {
		const queryParams = new URLSearchParams();
		if (date) queryParams.append("date", date);
		queryParams.append("ledger", id);

		const transactions = await AxiosRequest.get<ITransaction[]>(
			`/transaction${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
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
