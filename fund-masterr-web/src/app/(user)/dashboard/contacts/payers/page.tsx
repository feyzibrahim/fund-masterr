import { ContactList } from "../components/contact-list";

export default function PayersPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Payers</h1>
			<div className="rounded-md border">
				<ContactList />
			</div>
		</div>
	);
}
