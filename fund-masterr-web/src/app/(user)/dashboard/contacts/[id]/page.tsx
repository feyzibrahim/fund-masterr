import { AxiosRequest } from "@/lib/axios.instance";
import { ContactDetails } from "../components/contact-details";
import { IContact } from "@/types/contact-types";
import { notFound } from "next/navigation";

async function getContactDetails(id: string): Promise<IContact> {
	const response = await AxiosRequest.get<IContact>(`/contact/${id}`);

	return response;
}

export default async function ContactDetailsPage({ params }: { params: { id: string } }) {
	const contact = await getContactDetails(params.id);

	if (!contact) {
		notFound();
	}
	return (
		<div className="">
			<h1 className="text-xl mb-8 text-primary">Contact Details</h1>
			<ContactDetails contact={contact} />
		</div>
	);
}
