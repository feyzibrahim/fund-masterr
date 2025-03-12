import { ITransaction } from "@/types/transaction-types";
import UpdateContactPopover from "./update-agent-popover";
import { getContacts } from "../../contacts/action";

interface Props {
	transaction: ITransaction;
	type: "agent" | "payer" | "archive";
}

export async function UpdateContactList({ transaction, type }: Props) {
	if (type === "agent" && transaction.agent) {
		return `${transaction.agent?.firstName ?? ""} ${
			transaction.agent?.lastName ?? ""
		}`;
	}

	if (type === "payer" && transaction.payer) {
		return `${transaction.payer?.firstName ?? ""} ${
			transaction.payer?.lastName ?? ""
		}`;
	}

	const { contacts, error } = await getContacts(type);

	if (error || !contacts) {
		return null;
	}

	return (
		<UpdateContactPopover
			contacts={contacts}
			type={type}
			transactionId={transaction._id}
		/>
	);
}
