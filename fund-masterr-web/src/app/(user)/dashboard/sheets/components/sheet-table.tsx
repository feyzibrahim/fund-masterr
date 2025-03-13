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
import SheetStatus from "./sheet-status";
import { UpdateContactList } from "./update-agent-list";
import { UpdateSheetModal } from "./update-sheet-modal";

type SheetTableProps = {
	transactions?: ITransaction[];
	errorMessage?: string;
	showPayer?: boolean;
	showAgent?: boolean;
};

export function SheetTable({
	transactions,
	errorMessage,
	showAgent,
	showPayer,
}: SheetTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
					{showAgent && <TableHead>Agent</TableHead>}
					{showAgent && <TableHead>Payer</TableHead>}
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
							{showAgent && (
								<TableCell>
									<UpdateContactList
										transaction={transaction}
										type="agent"
									/>
								</TableCell>
							)}
							{showPayer && (
								<TableCell>
									<UpdateContactList
										transaction={transaction}
										type="payer"
									/>
								</TableCell>
							)}
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
