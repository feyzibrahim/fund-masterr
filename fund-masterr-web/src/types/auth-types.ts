export interface ILoginBodyTypes {
	emailOrPhone: string;
	password: string;
}
export interface ISignUpBodyTypes {
	email?: string;
	phoneNumber?: string;
	password: string;
	confirmPassword: string;
}

export interface IAuthResponseTypes {
	accessToken: string;
	refreshToken: string;
}
