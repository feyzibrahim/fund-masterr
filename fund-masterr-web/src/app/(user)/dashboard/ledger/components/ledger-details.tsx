import { formatCurrency, formatDate } from "@/lib/utils";
import { ILedger } from "@/types/ledger-types";
import { ITransaction } from "@/types/transaction-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LedgerDetailsProps = {
	transactions?: ITransaction[];
	ledger?: ILedger;
};

export function LedgerDetails({ transactions, ledger }: LedgerDetailsProps) {
	if (!ledger) return null;

	const calcBalance = () => {
		let balance = 0;

		if (transactions) {
			transactions.forEach((transaction) => {
				if (transaction.status !== "cancelled" && transaction.type === "sheet") {
					balance -= transaction.amount;
				}
				if (transaction.status === "cancelled") {
					balance += transaction.amount;
				}
				if (transaction.type === "fund") {
					balance += transaction.amount;
				}
			});
		}

		return balance;
	};

	return (
		<Card>
			<CardContent className="py-5">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div className="flex items-center gap-4">
							<h2 className="text-2xl font-bold">
								{`${ledger.contact.firstName} ${ledger.contact.lastName}`}
							</h2>
							<p className="text-foreground-secondary">
								{ledger.contact.email}
							</p>
						</div>
						{ledger.createdAt && (
							<p className="text-foreground-secondary text-xs pt-2">
								{formatDate(ledger.createdAt)}
							</p>
						)}
					</div>
					<div className="text-right">
						<p className="text-foreground-secondary">
							Current Balance:{" "}
							<span className="text-foreground font-bold">
								{transactions && formatCurrency(ledger.balance)}
							</span>
						</p>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Sheets Count</p>
						<h1 className="text-xl font-semibold">
							{transactions &&
								transactions.filter(
									(transaction) => transaction.type === "sheet"
								).length}
						</h1>
					</div>
					<div>
						<p className="text-foreground-secondary">Cancelled Sheets</p>
						<h1 className="text-xl font-semibold">
							{transactions &&
								transactions.filter(
									(sheet) =>
										sheet.status === "cancelled" &&
										sheet.type === "sheet"
								).length}
						</h1>
					</div>
					<div>
						<p className="text-foreground-secondary">Total Fund</p>
						<h1 className="text-xl font-semibold">
							{transactions &&
								formatCurrency(
									transactions.length > 0
										? transactions
												.filter(
													(transaction) =>
														transaction.type === "fund"
												)
												.reduce(
													(acc, fund) => acc + fund.amount,
													0
												)
										: 0
								)}
						</h1>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Sheets Total</p>
						<p className="text-xl font-bold">
							{transactions &&
								formatCurrency(
									transactions
										.filter(
											(transaction) => transaction.type === "sheet"
										)
										.reduce((acc, sheet) => acc + sheet.amount, 0)
								)}
						</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Cancelled Total</p>
						<p className="text-xl font-bold">
							{transactions &&
								formatCurrency(
									transactions
										.filter(
											(transaction) =>
												transaction.type === "sheet" &&
												transaction.status === "cancelled"
										)
										.reduce((acc, sheet) => acc + sheet.amount, 0)
								)}
						</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Day Balance</p>
						<p className="text-xl font-bold">
							{transactions && formatCurrency(calcBalance())}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
