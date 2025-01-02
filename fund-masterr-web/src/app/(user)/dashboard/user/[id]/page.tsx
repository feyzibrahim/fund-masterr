"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { calculateDailyStats, getUserById, getUserTransactions } from "@/lib/data";
import { UserDetails } from "@/components/user-details";
import { DailyTransactions } from "@/components/daily-transactions";
import { SetOldBalanceModal } from "@/components/set-old-balance-modal";
import { TransactionDatePicker } from "../components/transaction-date-picker";

export default function UserTransactionsPage() {
	const { id } = useParams();
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const user = getUserById(id as string);
	const transactions = getUserTransactions(id as string, date);
	const dailyStats = calculateDailyStats(id as string, date);

	if (!user) {
		return <div>User not found</div>;
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(e.target.value);
	};

	const handleSetOldBalance = (amount: number) => {
		// In a real application, you would update the user's old balance in your database here
		console.log(`Setting old balance for user ${user.id} to ${amount}`);
	};

	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">Transactions for {user.name}</h1>
			<div className="mb-4">
				<label htmlFor="date" className="mr-2">
					Select Date:
				</label>
				<TransactionDatePicker />
			</div>
			<div className="space-y-5">
				<UserDetails
					user={user}
					dailyStats={dailyStats}
					onSetOldBalance={() => setIsModalOpen(true)}
				/>
				<DailyTransactions transactions={transactions} />
			</div>
			<SetOldBalanceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSetOldBalance={handleSetOldBalance}
			/>
		</div>
	);
}
