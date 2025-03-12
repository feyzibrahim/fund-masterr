import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getContacts } from "../action";

interface Props {
	type?: "agent" | "payer" | "archive";
}

export async function ContactList({ type }: Props) {
	const { contacts, error } = await getContacts(type);

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
				{error ? (
					<TableRow>
						<TableCell colSpan={4} className="text-center text-red-500">
							{error}
						</TableCell>
					</TableRow>
				) : contacts && contacts.length === 0 ? (
					<TableRow>
						<TableCell colSpan={4} className="text-center">
							No {type}s are added. Please add a new one.
						</TableCell>
					</TableRow>
				) : (
					contacts &&
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
