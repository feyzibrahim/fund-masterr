import { ContactList } from "../components/contact-list";
import { AddNewAgentModal } from "./components/add-new-agent-modal";

export default async function AgentsPage() {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold mb-6">Agents</h1>
				<AddNewAgentModal />
			</div>
			<div className="rounded-md border">
				<ContactList type="agent" />
			</div>
		</div>
	);
}
