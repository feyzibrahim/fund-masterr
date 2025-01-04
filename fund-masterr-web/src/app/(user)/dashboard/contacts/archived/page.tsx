import { ContactList } from "../components/contact-list";

export default function ArchivedContactsPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Archived Contacts</h1>
			<div className="rounded-md border">
				<ContactList type="archive" />
			</div>
		</div>
	);
}
