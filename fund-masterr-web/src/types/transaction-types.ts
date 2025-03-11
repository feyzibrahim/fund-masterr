import { IContact } from "./contact-types";
import { ILedger } from "./ledger-types";
import { IUser } from "./user-types";

export interface ITransaction {
	_id: string;
	amount: number;
	message?: string;
	type: "sheet" | "fund" | "message";
	status: "pending" | "delivered" | "cancelled";
	statusChangeLogs?: { status: string; timestamp: Date }[];
	createdBy: IUser;
	ledgerIds: ILedger[];
	agent?: IContact;
	payer?: IContact;
	createdAt: string;
	updatedAt: string;
}
