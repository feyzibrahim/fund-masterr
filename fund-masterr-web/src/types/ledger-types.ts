import { IUser } from "./user-types";

export interface ILedger {
	_id: string;
	users: IUser[];
	oldBalance?: number;
	balance?: number;
	// sheetCount?: number;
	// lastSheet: string;
	createdAt?: string;
	updatedAt?: string;
}
