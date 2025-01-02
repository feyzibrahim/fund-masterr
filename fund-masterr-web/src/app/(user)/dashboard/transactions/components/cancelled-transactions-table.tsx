import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/util";

export function CancelledTransactionsTable({
	transactions,
}: {
	transactions: Transaction[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.map((transaction) => (
					<TableRow key={transaction.id}>
						<TableCell>{formatCurrency(transaction.amount)}</TableCell>
						<TableCell>
							<span
								className={
									transaction.type === "credit"
										? "text-green-600"
										: "text-red-600"
								}
							>
								{transaction.type}
							</span>
						</TableCell>
						<TableCell>{formatDate(transaction.date)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
