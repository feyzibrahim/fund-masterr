import { DailySheets } from "@/app/(user)/dashboard/ledger/components/daily-sheets";

interface Props {
	params: { id: string };
}

export default function UserSheetsPage({ params }: Props) {
	return (
		<>
			<div className="space-y-5">
				{/* <UserDetails
					user={user}
					dailyStats={dailyStats}
					onSetOldBalance={() => setIsModalOpen(true)}
				/> */}
				<DailySheets userId={params.id} />
			</div>
			{/* <SetOldBalanceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSetOldBalance={handleSetOldBalance}
			/> */}
		</>
	);
}
