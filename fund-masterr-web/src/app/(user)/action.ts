import { AxiosRequest } from "@/lib/axios.instance";
import { IUser } from "@/types/user-types";

export async function getUser() {
	try {
		const user = await AxiosRequest.get<IUser>(`/user/me`);
		return { user };
	} catch (error: any) {
		const errorMessage =
			error.message ?? "An error occurred while fetching transactions.";
		return { error: errorMessage };
	}
}
