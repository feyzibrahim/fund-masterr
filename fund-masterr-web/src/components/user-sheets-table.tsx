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

export function UserSheetsTable({ users }: { users: User[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Balance</TableHead>
					<TableHead>Last Sheets</TableHead>
					<TableHead>Last Sheet Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>
							<Link
								href={`/dashboard/sheets/user/${user.id}`}
								className="text-blue-600 hover:underline"
							>
								{user.name}
							</Link>
						</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{formatCurrency(user.balance)}</TableCell>
						<TableCell>
							{formatCurrency(user.lastSheet.amount)}{" "}
							<span
								className={
									user.lastSheet.type === "credit"
										? "text-green-600"
										: "text-red-600"
								}
							>
								({user.lastSheet.type})
							</span>
						</TableCell>
						<TableCell>{formatDate(user.lastSheet.date)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
