export interface IUser {
	_id: string;
	firstName?: string;
	lastName?: string;
	email: string;
	password?: string;
	phoneNumber?: number;
	role?: "agent" | "payer" | "admin";
	isActive: boolean;
	profileImgURL?: string;
	isEmailVerified?: boolean;
}
