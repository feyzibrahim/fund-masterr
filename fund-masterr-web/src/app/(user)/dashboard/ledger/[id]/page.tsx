import { DailySheets } from "@/app/(user)/dashboard/ledger/components/daily-sheets";
import { AxiosRequest } from "@/lib/axios.instance";
import { ISheet } from "@/types/sheet-types";
import { CreateSheetModal } from "../components/create-sheet-modal";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function UserSheetsPage({ params, searchParams }: Props) {
	let sheets: ISheet[] = [];
	let errorMessage = "";

	try {
		const date = searchParams?.date;
		sheets = await AxiosRequest.get<ISheet[]>(
			`/sheet?ledger=${params.id}${date ? `&date=${date}` : ""}`
		);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold mb-5">Sheets</h1>
				<CreateSheetModal />
			</div>
			{/* <UserDetails
					user={user}
					dailyStats={dailyStats}
					onSetOldBalance={() => setIsModalOpen(true)}
				/> */}
			<DailySheets sheets={sheets} errorMessage={errorMessage} />
		</div>
	);
}
