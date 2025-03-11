import { AxiosRequest } from "@/lib/axios.instance";
import { ITransaction } from "@/types/transaction-types";

export async function getSheets(date?: string, status?: string) {
	try {
		const queryParams = new URLSearchParams();
		if (date) queryParams.append("date", date);
		if (status) queryParams.append("status", status);

		queryParams.append("type", "sheet");

		const transactions = await AxiosRequest.get<ITransaction[]>(
			`/transaction${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
		);
		return { transactions };
	} catch (error: any) {
		const errorMessage =
			error.message ?? "An error occurred while fetching transactions.";
		return { error: errorMessage };
	}
}
