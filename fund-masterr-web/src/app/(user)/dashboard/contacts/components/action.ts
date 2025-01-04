"use server";
import { AxiosRequest } from "@/lib/axios.instance";
import { ContactFormValues } from "./create-contact-form";
import { revalidatePath } from "next/cache";

export async function createNewContact(
	formData: ContactFormValues,
	type: "agent" | "payer"
) {
	try {
		await AxiosRequest.post("/contact", { ...formData });
		revalidatePath(`/dashboard/contacts/${type}s`);
		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
