import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ILedger } from "@/types/ledger-types";
import { ISheet } from "@/types/sheet-types";
import { UserPlus } from "lucide-react";

type DailySheetsProps = {
	sheets?: ISheet[];
	ledger?: ILedger;
	errorMessage?: string;
	showPayer?: boolean;
	showAgent?: boolean;
};

export function DailySheets({
	sheets,
	ledger,
	errorMessage,
	showPayer,
	showAgent,
}: DailySheetsProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
					<TableHead>Status</TableHead>
					{(showPayer || (ledger && ledger.contact.type === "agent")) && (
						<TableHead>Payer</TableHead>
					)}
					{(showAgent || (ledger && ledger.contact.type === "payer")) && (
						<TableHead>Assigned To</TableHead>
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				{errorMessage ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center text-red-500">
							{errorMessage}
						</TableCell>
					</TableRow>
				) : sheets && sheets.length === 0 ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center py-20">
							No sheets are added. Please add a new one.
						</TableCell>
					</TableRow>
				) : (
					sheets &&
					sheets.map((sheet) => (
						<TableRow key={sheet._id}>
							<TableCell>{formatCurrency(sheet.amount)}</TableCell>
							<TableCell>{formatDate(sheet.createdAt)}</TableCell>
							<TableCell className="capitalize">{sheet.status}</TableCell>
							{(showPayer ||
								(ledger && ledger.contact.type === "agent")) && (
								<TableCell className="p-0">
									{sheet.ledgerIds.find(
										(ledger) => ledger.contact?.type === "payer"
									) ? (
										`${
											sheet.ledgerIds.find(
												(ledger) =>
													ledger.contact?.type === "payer"
											)?.contact.firstName
										} ${
											sheet.ledgerIds.find(
												(ledger) =>
													ledger.contact?.type === "payer"
											)?.contact.lastName
										}`
									) : (
										<Button
											variant="outline"
											className="flex items-center gap-2"
										>
											<UserPlus className="w-4 h-4" />
											Add Payer
										</Button>
									)}
								</TableCell>
							)}
							{(showAgent ||
								(ledger && ledger.contact.type === "payer")) && (
								<TableCell className="p-0">
									{sheet.agent ? (
										`${sheet.agent.firstName} ${sheet.agent.lastName}`
									) : (
										<Button
											variant="outline"
											className="flex items-center gap-2"
										>
											<UserPlus className="w-4 h-4" />
											Add Agent
										</Button>
									)}
								</TableCell>
							)}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
