import { Transaction } from "@/lib/data";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/util";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type DailyTransactionsProps = {
	transactions: Transaction[];
};

export function DailyTransactions({ transactions }: DailyTransactionsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Today&apos;s Transactions</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Time</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell>{formatDate(transaction.date)}</TableCell>
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
								<TableCell>
									{formatCurrency(transaction.amount)}
								</TableCell>
								<TableCell>{transaction.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
