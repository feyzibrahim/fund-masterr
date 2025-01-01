import { ContactList } from "./components/contact-list";

export default function ContactsPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">All Contacts</h1>
			<div className="rounded-md border">
				<ContactList />
			</div>
		</div>
	);
}
