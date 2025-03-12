import { TransactionsList } from "@/components/transactions-list";
import { AddFundModal } from "../components/add-fund-modal";
import { CreateSheetModal } from "../components/create-sheet-modal";
import { LedgerDetails } from "../components/ledger-details";
import { getLedger, getTransactions } from "./action";

interface Props {
	params: { id: string };
}

export default async function LedgerDetailPage({ params }: Props) {
	let { transactions, error: transactionsError } = await getTransactions(params.id);
	let { ledger } = await getLedger(params.id);

	return (
		<div className="space-y-5">
			<LedgerDetails transactions={transactions} ledger={ledger} />

			<div className="w-full flex items-center gap-5">
				<AddFundModal ledger={ledger} />
				<CreateSheetModal ledger={ledger} />
			</div>

			<TransactionsList
				transactions={transactions}
				errorMessage={transactionsError}
				ledger={ledger}
			/>
		</div>
	);
}
