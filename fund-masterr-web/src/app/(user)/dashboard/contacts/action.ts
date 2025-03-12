import { AxiosRequest } from "@/lib/axios.instance";
import { IContact } from "@/types/contact-types";

export async function getContacts(
	type?: "agent" | "payer" | "archive"
): Promise<{ contacts?: IContact[]; error?: string }> {
	try {
		const contacts = await AxiosRequest.get<IContact[]>(
			`/contact${type ? `?type=${type}` : ""}`
		);
		return { contacts };
	} catch (error: any) {
		const errorMessage =
			error.message ?? "An error occurred while fetching contacts.";
		return { error: errorMessage };
	}
}
