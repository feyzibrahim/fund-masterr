import { IContact } from "./contact-types";
import { IUser } from "./user-types";

export interface ILedger {
	_id: string;
	contact: IContact;
	createdBy: IUser;
	activeToday: boolean;
	oldBalance?: number;
	createdAt?: string;
	updatedAt?: string;
}
