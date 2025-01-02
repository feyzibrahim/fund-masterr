import * as jose from "jose";

export const validateJwt = async (token: string) => {
	// if (!process.env.JWT_SECRET) {
	// 	throw new Error("JWT_SECRET not found in .env");
	// }
	const secretKey = new TextEncoder().encode(process.env.SECRET);
	const decoded = await jose.jwtVerify(token, secretKey);
	return decoded.payload;
};
