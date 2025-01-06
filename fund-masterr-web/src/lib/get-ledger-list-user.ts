import { IUser } from "@/types/user-types";

export const getLedgerListUser = (users: IUser[], id: string) => {
	return users.find((user) => user._id !== id);
};
