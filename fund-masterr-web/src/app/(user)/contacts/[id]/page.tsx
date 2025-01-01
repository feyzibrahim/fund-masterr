import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

// This is a mock function to get contact details. In a real application, you'd fetch this data from an API or database.
async function getContactDetails(id: string) {
	// Simulate an API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const contacts = [
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			phone: "123-456-7890",
			address: "123 Main St, Anytown, USA",
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "098-765-4321",
			address: "456 Elm St, Othertown, USA",
		},
	];

	return contacts.find((contact) => contact.id === id) || null;
}

export default async function ContactDetailsPage({ params }: { params: { id: string } }) {
	const contact = await getContactDetails(params.id);

	if (!contact) {
		notFound();
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Contact Details</h1>
			<div className="rounded-md border">
				<Table>
					<TableBody>
						<TableRow>
							<TableHead className="w-[200px]">Name</TableHead>
							<TableCell>{contact.name}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>Email</TableHead>
							<TableCell>{contact.email}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>Phone</TableHead>
							<TableCell>{contact.phone}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>Address</TableHead>
							<TableCell>{contact.address}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex space-x-4">
				<Button>Edit</Button>
				<Button variant="destructive">Archive</Button>
			</div>
		</div>
	);
}
