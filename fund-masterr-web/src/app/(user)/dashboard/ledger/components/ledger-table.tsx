import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/auth-utils";
import { getLedgerListUser } from "@/lib/get-ledger-list-user";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ILedger } from "@/types/ledger-types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
	ledgers: ILedger[];
	errorMessage: string;
}

export async function LedgerTable({ ledgers, errorMessage }: Props) {
	const session = await getSession();
	if (!session) {
		notFound();
	}

	const { _id } = session;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Old Balance</TableHead>
					<TableHead>Balance</TableHead>
					<TableHead>Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{errorMessage ? (
					<TableRow>
						<TableCell colSpan={4} className="text-center text-red-500">
							{errorMessage}
						</TableCell>
					</TableRow>
				) : ledgers.length === 0 ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							No ledgers were created. Please create a new one.
						</TableCell>
					</TableRow>
				) : (
					ledgers.map((ledger) => (
						<TableRow key={ledger._id}>
							<TableCell>
								<Link
									href={`/dashboard/ledger/${ledger._id}`}
									className="text-blue-600 hover:underline"
								>
									{
										getLedgerListUser(ledger.users, _id as string)
											?.firstName
									}{" "}
									{
										getLedgerListUser(ledger.users, _id as string)
											?.lastName
									}
								</Link>
							</TableCell>
							<TableCell>
								{
									getLedgerListUser(ledger.users, _id as string)
										?.phoneNumber
								}
							</TableCell>
							<TableCell>
								{ledger.oldBalance && formatCurrency(ledger.oldBalance)}
							</TableCell>
							<TableCell>
								{ledger.balance && formatCurrency(ledger.balance)}{" "}
							</TableCell>
							<TableCell>
								{ledger.createdAt && formatDate(ledger.createdAt)}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
