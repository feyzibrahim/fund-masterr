import { users } from "../../../../lib/data";
import { UserTransactionsTable } from "../../../../components/user-transactions-table";

export default function Home() {
	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">User Transactions</h1>
			<UserTransactionsTable users={users} />
		</div>
	);
}
