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
import { ISheet } from "@/types/sheet-types";
import { UserPlus } from "lucide-react";

type DailySheetsProps = {
	sheets?: ISheet[];
	errorMessage?: string;
	hidePayer?: boolean;
};

export function DailySheets({ sheets, errorMessage, hidePayer }: DailySheetsProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
					<TableHead>Status</TableHead>
					{!hidePayer && <TableHead>Payer</TableHead>}
					<TableHead>Assigned To</TableHead>
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
							{!hidePayer && (
								<TableCell className="p-0">
									{
										sheet.ledgerIds.find(
											(ledger) => ledger.contact?.type === "payer"
										)?.contact.firstName
									}{" "}
									{
										sheet.ledgerIds.find(
											(ledger) => ledger.contact?.type === "payer"
										)?.contact.lastName
									}
								</TableCell>
							)}
							<TableCell className="p-0">
								{sheet.agent ? (
									`${sheet.agent.firstName} ${sheet.agent.lastName}`
								) : (
									<Button size="icon" variant="outline">
										<UserPlus className="w-4 h-4" />
									</Button>
								)}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
