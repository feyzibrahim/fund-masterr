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
import { TrashIcon } from "lucide-react";
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
				) : ledgers.length === 0 ? (
					<TableRow>
						<TableCell colSpan={6} className="text-center">
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
									{ledger.contact.firstName} {ledger.contact.lastName}
								</Link>
							</TableCell>
							<TableCell>{ledger.contact.phone}</TableCell>
							<TableCell>
								{ledger.oldBalance && formatCurrency(ledger.oldBalance)}
							</TableCell>
							<TableCell>
								{ledger.balance && formatCurrency(ledger.balance)}{" "}
							</TableCell>
							<TableCell>
								{ledger.createdAt && formatDate(ledger.createdAt)}
							</TableCell>
							<TableCell>
								<TrashIcon className="w-4 h-4" />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
