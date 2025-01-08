import { IUser } from "./user-types";

export interface IFund {
	_id: string;
	amount: number;
	addedBy: IUser;
	ledgerId: string;
	createdAt?: string;
	updatedAt?: string;
}
