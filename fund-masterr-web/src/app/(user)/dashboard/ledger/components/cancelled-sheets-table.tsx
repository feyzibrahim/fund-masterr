import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ISheet } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export function CancelledSheetsTable({ sheets }: { sheets: ISheet[] }) {
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
				{sheets.map((sheet) => (
					<TableRow key={sheet.id}>
						<TableCell>{formatCurrency(sheet.amount)}</TableCell>
						<TableCell>
							<span
								className={
									sheet.type === "credit"
										? "text-green-600"
										: "text-red-600"
								}
							>
								{sheet.type}
							</span>
						</TableCell>
						<TableCell>{formatDate(sheet.date)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
