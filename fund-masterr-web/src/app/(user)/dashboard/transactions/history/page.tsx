import { transactions } from "../../../../../lib/data";
import { AllTransactionsTable } from "../components/all-transactions-table";

export default function History() {
	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">History</h1>
			<AllTransactionsTable transactions={transactions} />
		</div>
	);
}
