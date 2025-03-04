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
import { UpdateSheetModal } from "./update-sheet-modal";

type SheetTableProps = {
	sheets?: ISheet[];
	errorMessage?: string;
};

export function SheetTable({ sheets, errorMessage }: SheetTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Update</TableHead>
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
							No sheets are added...
						</TableCell>
					</TableRow>
				) : (
					sheets &&
					sheets.map((sheet) => (
						<TableRow key={sheet._id}>
							<TableCell>{formatCurrency(sheet.amount)}</TableCell>
							<TableCell>{formatDate(sheet.createdAt)}</TableCell>
							<TableCell className="capitalize">{sheet.status}</TableCell>
							<TableCell>
								<UpdateSheetModal sheetId={sheet._id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
