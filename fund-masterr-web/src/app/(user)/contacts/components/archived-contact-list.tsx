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

// This is a mock data array for archived contacts. In a real application, you'd fetch this data from an API or database.
const archivedContacts = [
	{ id: 5, name: "Emily Brown", email: "emily@example.com", phone: "111-222-3333" },
	{ id: 6, name: "Michael Green", email: "michael@example.com", phone: "444-555-6666" },
	// Add more mock archived contacts as needed
];

export function ArchivedContactList() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Phone</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{archivedContacts.map((contact) => (
					<TableRow key={contact.id}>
						<TableCell>{contact.name}</TableCell>
						<TableCell>{contact.email}</TableCell>
						<TableCell>{contact.phone}</TableCell>
						<TableCell>
							<Button asChild variant="outline" size="sm">
								<Link href={`/contacts/${contact.id}`}>View Details</Link>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
