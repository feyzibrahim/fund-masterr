import { getSheets } from "../action";
import { SheetTable } from "../components/sheet-table";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function CancelledTransactionsPage({ params, searchParams }: Props) {
	const { transactions, error: errorMessage } = await getSheets(
		searchParams?.date,
		"cancelled"
	);

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl= mb-5">Cancelled Transactions</h1>
				{/* <CreateTransactionModal /> */}
			</div>
			<SheetTable transactions={transactions} errorMessage={errorMessage} />
		</div>
	);
}
