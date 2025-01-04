import { ContactList } from "../components/contact-list";
import { AddNewPayerModal } from "./components/add-new-payer-modal";

export default function PayersPage() {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold mb-6">Payers</h1>
				<AddNewPayerModal />
			</div>
			<div className="rounded-md border">
				<ContactList type="payer" />
			</div>
		</div>
	);
}
