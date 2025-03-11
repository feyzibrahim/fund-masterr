import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ITransaction } from "@/types/transaction-types";
import { UpdateSheetModal } from "./update-sheet-modal";
import { CheckCircle, CopyX, Timer } from "lucide-react";
import SheetStatus from "./sheet-status";

type SheetTableProps = {
	transactions?: ITransaction[];
	errorMessage?: string;
};

export function SheetTable({ transactions, errorMessage }: SheetTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
					<TableHead>Agent</TableHead>
					<TableHead>Payer</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{errorMessage ? (
					<TableRow>
						<TableCell colSpan={6} className="text-center text-red-500">
							{errorMessage}
						</TableCell>
					</TableRow>
				) : transactions && transactions.length === 0 ? (
					<TableRow>
						<TableCell colSpan={6} className="text-center py-20">
							No transactions are added...
						</TableCell>
					</TableRow>
				) : (
					transactions &&
					transactions.map((transaction) => (
						<TableRow key={transaction._id}>
							<TableCell>{formatCurrency(transaction.amount)}</TableCell>
							<TableCell>{formatDate(transaction.createdAt)}</TableCell>
							<TableCell>{`${transaction.agent?.firstName ?? ""} ${
								transaction.agent?.lastName ?? ""
							}`}</TableCell>
							<TableCell>{`${transaction.payer?.firstName ?? ""} ${
								transaction.payer?.lastName ?? ""
							}`}</TableCell>
							<TableCell>
								<SheetStatus status={transaction.status} />
							</TableCell>
							<TableCell>
								<UpdateSheetModal sheetId={transaction._id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
