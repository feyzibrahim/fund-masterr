import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { IFund } from "@/types/fund-types";

type FundsTableProps = {
	funds?: IFund[];
	errorMessage?: string;
};

export function FundsTable({ funds, errorMessage }: FundsTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Amount</TableHead>
					<TableHead>Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{errorMessage ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center text-red-500">
							{errorMessage}
						</TableCell>
					</TableRow>
				) : funds && funds.length === 0 ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center py-20">
							No funds are added. Please add a new one.
						</TableCell>
					</TableRow>
				) : (
					funds &&
					funds.map((fund) => (
						<TableRow key={fund._id}>
							<TableCell>{formatCurrency(fund.amount)}</TableCell>
							<TableCell>
								{fund.createdAt && formatDate(fund.createdAt)}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
