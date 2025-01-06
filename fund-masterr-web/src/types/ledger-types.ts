import { IContact } from "./contact-types";
import { IUser } from "./user-types";

export interface ILedger {
	_id: string;
	contact: IContact;
	createdBy: IUser;
	oldBalance?: number;
	balance?: number;
	// sheetCount?: number;
	// lastSheet: string;
	createdAt?: string;
	updatedAt?: string;
}
