import { IContact } from "./contact-types";
import { ILedger } from "./ledger-types";
import { IUser } from "./user-types";

export interface ISheet {
	_id: string;
	amount: number;
	status: "pending" | "delivered" | "cancelled";
	statusChangeLogs?: { status: string; timestamp: Date }[];
	createdBy: IUser;
	ledgerId: ILedger;
	agent?: IContact;
	createdAt: string;
	updatedAt: string;
}
