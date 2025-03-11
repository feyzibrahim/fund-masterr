import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ILedger } from "@/types/ledger-types";
import { ITransaction } from "@/types/transaction-types";
import { IndianRupee, Layers2, MessageCircle, Sheet, UserPlus } from "lucide-react";

type TransactionsListProps = {
	transactions?: ITransaction[];
	ledger?: ILedger;
	errorMessage?: string;
};

export function TransactionsList({
	transactions,
	ledger,
	errorMessage,
}: TransactionsListProps) {
	if (errorMessage) {
		return <p className="text-center text-red-500">{errorMessage}</p>;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<p className="text-center py-20">
				No transactions are added. Please add a new one.
			</p>
		);
	}

	return (
		<div className="space-y-4">
			{transactions.map((transaction) => (
				<div
					key={transaction._id}
					className={`p-4 border rounded-lg shadow-md flex items-center gap-5 bg-opacity-5 ${
						transaction.type === "sheet"
							? "border-blue-800 bg-blue-800"
							: transaction.type === "fund"
							? "border-green-800 bg-green-800"
							: "border-yellow-800 bg-yellow-800"
					}`}
				>
					{transaction.type === "sheet" && (
						<Layers2 className="w-8 h-8 text-white" />
					)}
					{transaction.type === "fund" && (
						<IndianRupee className="w-8 h-8 text-white" />
					)}
					{transaction.type === "message" && (
						<MessageCircle className="w-8 h-8 text-white" />
					)}
					<div className="w-full">
						<div className="flex justify-between items-center">
							<p className="font-bold">
								{formatCurrency(transaction.amount)}
							</p>
							<p className="text-sm ">
								{formatDate(transaction.createdAt)}
							</p>
						</div>
						<p className="capitalize text-sm">Status: {transaction.status}</p>

						{/* Payer Section */}
						{ledger &&
							ledger.contact.type === "agent" &&
							transaction.type === "sheet" && (
								<div className="mt-2">
									<strong>Payer:</strong>{" "}
									{transaction.payer ? (
										`${transaction.payer.firstName} ${transaction.payer.lastName}`
									) : (
										<Button
											variant="outline"
											className="flex items-center gap-2"
										>
											<UserPlus className="w-4 h-4" /> Add Payer
										</Button>
									)}
								</div>
							)}

						{/* Agent Section */}
						{ledger &&
							ledger.contact.type === "payer" &&
							transaction.type === "sheet" && (
								<div className="mt-2">
									<strong>Assigned To:</strong>{" "}
									{transaction.agent ? (
										`${transaction.agent.firstName} ${transaction.agent.lastName}`
									) : (
										<Button
											variant="outline"
											className="flex items-center gap-2"
										>
											<UserPlus className="w-4 h-4" /> Add Agent
										</Button>
									)}
								</div>
							)}
					</div>
				</div>
			))}
		</div>
	);
}
