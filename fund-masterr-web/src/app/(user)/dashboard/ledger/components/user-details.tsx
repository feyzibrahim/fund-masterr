import { formatCurrency } from "@/lib/utils";
import { IFund } from "@/types/fund-types";
import { ILedger } from "@/types/ledger-types";
import { ISheet } from "@/types/sheet-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type UserDetailsProps = {
	sheets?: ISheet[];
	funds?: IFund[];
	ledger?: ILedger;
};

export function UserDetails({ sheets, funds, ledger }: UserDetailsProps) {
	const calcGrandTotal = () => {
		let grandTotal = 0;
		if (sheets) {
			sheets.forEach((sheet) => {
				grandTotal += sheet.amount;
			});
		}
		if (funds) {
			funds.forEach((fund) => {
				grandTotal += fund.amount;
			});
		}
		if (ledger && ledger.oldBalance) {
			grandTotal += ledger.oldBalance;
		}
		return grandTotal;
	};

	return (
		<Card>
			<CardContent className="py-5">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h2 className="text-2xl font-bold mb-2">
							{ledger &&
								`${ledger.contact.firstName} ${ledger.contact.lastName}`}
						</h2>
						<p className="text-foreground-secondary">
							{ledger && ledger.contact.email}
						</p>
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
									sheets
										.filter((sheet) => sheet.status !== "cancelled")
										.reduce((acc, sheet) => acc + sheet.amount, 0)
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
