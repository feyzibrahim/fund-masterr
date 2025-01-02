import { transactions } from "../../../../../lib/data";
import { CancelledTransactionsTable } from "../components/cancelled-transactions-table";

export default function CancelledTransactions() {
	const cancelledTransactions = transactions.filter((t) => t.status === "cancelled");

	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">Cancelled Transactions</h1>
			<CancelledTransactionsTable transactions={cancelledTransactions} />
		</div>
	);
}
