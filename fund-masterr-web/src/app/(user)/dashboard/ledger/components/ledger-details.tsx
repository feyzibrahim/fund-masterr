import { formatCurrency, formatDate } from "@/lib/utils";
import { IFund } from "@/types/fund-types";
import { ILedger } from "@/types/ledger-types";
import { ISheet } from "@/types/sheet-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LedgerDetailsProps = {
	sheets?: ISheet[];
	funds?: IFund[];
	ledger?: ILedger;
};

export function LedgerDetails({ sheets, funds, ledger }: LedgerDetailsProps) {
	const calcGrandTotal = () => {
		let grandTotal = 0;
		if (ledger && ledger.oldBalance) {
			grandTotal += ledger.oldBalance;
		}

		if (sheets) {
			sheets.forEach((sheet) => {
				if (sheet.status !== "cancelled") {
					grandTotal += sheet.amount;
				}
			});
		}
		if (funds) {
			funds.forEach((fund) => {
				grandTotal -= fund.amount;
			});
		}

		return grandTotal;
	};

	if (!ledger) return null;

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
						<p className="text-lg font-semibold">
							Fund:{" "}
							{funds &&
								formatCurrency(
									funds.length > 0
										? funds.reduce(
												(acc, fund) => acc + fund.amount,
												0
										  )
										: 0
								)}
						</p>
						{ledger && ledger.oldBalance !== undefined ? (
							<p className="text-foreground-secondary">
								Old Balance: {formatCurrency(ledger.oldBalance)}
							</p>
						) : (
							<Button>Set Old Balance</Button>
						)}
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Sheets Count</p>
						<p className="text-xl font-semibold">{sheets && sheets.length}</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Cancelled Sheets</p>
						<p className="text-xl font-semibold">
							{sheets &&
								sheets.filter((sheet) => sheet.status === "cancelled")
									.length}
						</p>
					</div>
					<div>
						<p className="text-foreground-secondary">
							Total Amount Cancelled
						</p>
						<p className="text-xl font-semibold">
							{sheets &&
								formatCurrency(
									sheets
										.filter((sheet) => sheet.status === "cancelled")
										.reduce((acc, sheet) => acc + sheet.amount, 0)
								)}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Sheets Total</p>
						<p className="text-xl font-bold">
							{sheets &&
								formatCurrency(
									sheets.reduce((acc, sheet) => acc + sheet.amount, 0)
								)}
						</p>
					</div>
					<div className="border w-fit px-2 py-1 rounded">
						<p className="text-foreground-secondary">Grand Total</p>
						<p className="text-2xl font-bold">
							{formatCurrency(calcGrandTotal())}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
