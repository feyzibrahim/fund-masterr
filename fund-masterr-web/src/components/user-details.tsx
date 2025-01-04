import { User } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

type UserDetailsProps = {
	user: User;
	dailyStats: {
		sheetCount: number;
		cancelledCount: number;
		totalCancelled: number;
		netTotal: number;
	};
	onSetOldBalance: () => void;
};

export function UserDetails({ user, dailyStats, onSetOldBalance }: UserDetailsProps) {
	return (
		<Card>
			<CardContent className="py-5">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h2 className="text-2xl font-bold mb-2">{user.name}</h2>
						<p className="text-foreground-secondary">{user.email}</p>
					</div>
					<div className="text-right">
						<p className="text-lg font-semibold">
							Current Balance: {formatCurrency(user.balance)}
						</p>
						{user.oldBalance !== undefined ? (
							<p className="text-foreground-secondary">
								Old Balance: {formatCurrency(user.oldBalance)}
							</p>
						) : (
							<button
								onClick={onSetOldBalance}
								className="text-primary underline"
							>
								Set Old Balance
							</button>
						)}
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Today&apos;s Sheets</p>
						<p className="text-xl font-semibold">{dailyStats.sheetCount}</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Cancelled Sheets</p>
						<p className="text-xl font-semibold">
							{dailyStats.cancelledCount}
						</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Total Cancelled</p>
						<p className="text-xl font-semibold">
							{formatCurrency(dailyStats.totalCancelled)}
						</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="text-foreground-secondary">Today&apos;s Net Total</p>
					<p className="text-2xl font-bold">
						{formatCurrency(dailyStats.netTotal)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
