import { ISheet } from "@/lib/data";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../../../components/ui/card";

type DailySheetsProps = {
	userId: string;
};

export function DailySheets({ userId }: DailySheetsProps) {
	console.log("🚀 ~ file: daily-sheets.tsx:18 ~ DailySheets ~ userId:", userId);
	const sheets: ISheet[] = [];
	let errorMessage = "";

	return (
		<Card>
			<CardHeader>
				<CardTitle>Today&apos;s Sheets</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Time</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{errorMessage ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center text-red-500"
								>
									{errorMessage}
								</TableCell>
							</TableRow>
						) : sheets.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-20">
									No sheets are added. Please add a new one.
								</TableCell>
							</TableRow>
						) : (
							sheets.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell>{formatDate(transaction.date)}</TableCell>
									<TableCell>
										<span
											className={
												transaction.type === "credit"
													? "text-green-600"
													: "text-red-600"
											}
										>
											{transaction.type}
										</span>
									</TableCell>
									<TableCell>
										{formatCurrency(transaction.amount)}
									</TableCell>
									<TableCell>{transaction.status}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
