import { Button } from "@/components/ui/button";
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
import { ChevronRight, TrashIcon } from "lucide-react";
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
					<TableHead>Phone</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Old Balance</TableHead>
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
							<TableCell className="capitalize">
								{ledger.contact.type}
							</TableCell>
							<TableCell>
								{ledger.oldBalance && formatCurrency(ledger.oldBalance)}
							</TableCell>
							<TableCell className="p-0">
								<Link href={`/dashboard/ledger/${ledger._id}`}>
									<Button size="icon" variant="outline">
										<ChevronRight className="w-4 h-4" />
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
