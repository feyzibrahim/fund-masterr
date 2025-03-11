export interface ITransactionCreateDTO {
	id?: number;
	amount?: number;
	message?: string;
	type?: "sheet" | "fund" | "message";
	status?: "pending" | "delivered" | "cancelled" | "none";
	createdBy: string;
	ledgerIds: string[];
	agent?: string;
	payer?: string;
}
