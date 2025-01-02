import Link from "next/link";
import { User } from "@/lib/data";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

export function UserTransactionsTable({ users }: { users: User[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Balance</TableHead>
					<TableHead>Last Transaction</TableHead>
					<TableHead>Last Transaction Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>
							<Link
								href={`/dashboard/transactions/user/${user.id}`}
								className="text-blue-600 hover:underline"
							>
								{user.name}
							</Link>
						</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{formatCurrency(user.balance)}</TableCell>
						<TableCell>
							{formatCurrency(user.lastTransaction.amount)}{" "}
							<span
								className={
									user.lastTransaction.type === "credit"
										? "text-green-600"
										: "text-red-600"
								}
							>
								({user.lastTransaction.type})
							</span>
						</TableCell>
						<TableCell>{formatDate(user.lastTransaction.date)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
