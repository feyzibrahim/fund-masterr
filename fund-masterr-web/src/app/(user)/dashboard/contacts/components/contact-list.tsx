import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AxiosRequest } from "@/lib/axios.instance";
import { IContact } from "@/types/contact-types";

interface Props {
	type?: "agent" | "payer" | "archive";
}

export async function ContactList({ type }: Props) {
	let contacts: IContact[] = [];
	let errorMessage = "";

	try {
		contacts = await AxiosRequest.get<IContact[]>(
			`/contact${type ? `?type=${type}` : ""}`
		);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching contacts.";
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Phone</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{errorMessage ? (
					<TableRow>
						<TableCell colSpan={4} className="text-center text-red-500">
							{errorMessage}
						</TableCell>
					</TableRow>
				) : contacts.length === 0 ? (
					<TableRow>
						<TableCell colSpan={4} className="text-center">
							No {type}s are added. Please add a new one.
						</TableCell>
					</TableRow>
				) : (
					contacts.map((contact) => (
						<TableRow key={contact._id}>
							<TableCell>
								{contact.firstName} {contact.lastName ?? ""}
							</TableCell>
							<TableCell>{contact.phone}</TableCell>
							<TableCell>{contact.email ?? "N/A"}</TableCell>
							<TableCell>
								<Button asChild variant="outline" size="sm">
									<Link href={`/dashboard/contacts/${contact._id}`}>
										View Details
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
