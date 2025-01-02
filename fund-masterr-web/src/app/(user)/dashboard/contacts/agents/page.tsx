import { ContactList } from "../components/contact-list";

export default function AgentsPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Agents</h1>
			<div className="rounded-md border">
				<ContactList />
			</div>
		</div>
	);
}
