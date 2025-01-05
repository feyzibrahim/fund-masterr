export interface IContact {
	_id: string;
	firstName: string;
	lastName?: string;
	email?: string;
	phone: string;
	address?: string;
	createdBy: {
		_id: string;
		email: string;
	};
	type: "payer" | "agent";
	archive?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	profileImgURL?: string;
}
