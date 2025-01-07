import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ISheet } from "@/lib/data";

export function AllSheetsTable({ sheets }: { sheets: ISheet[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Status</TableHead>
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
						<TableCell>{sheet.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
