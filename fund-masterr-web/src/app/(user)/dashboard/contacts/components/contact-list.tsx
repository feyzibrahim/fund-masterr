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

// This is a mock data array. In a real application, you'd fetch this data from an API or database.
const contacts = [
	{ id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321" },
	{ id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555" },
	{ id: 4, name: "Bob Williams", email: "bob@example.com", phone: "444-444-4444" },
	// Add more mock contacts as needed
];

export function ContactList() {
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
				{contacts.map((contact) => (
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
