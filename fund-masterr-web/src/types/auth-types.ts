export interface ILoginBodyTypes {
	email: string;
	password: string;
}

export interface ILoginResponseTypes {
	accessToken: string;
	refreshToken: string;
}
