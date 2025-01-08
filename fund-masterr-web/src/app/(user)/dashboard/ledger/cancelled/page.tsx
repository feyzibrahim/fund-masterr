import { DailySheets } from "../components/daily-sheets";
import { AxiosRequest } from "@/lib/axios.instance";
import { ISheet } from "@/types/sheet-types";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function CancelledSheetsPage({ params, searchParams }: Props) {
	let sheets: ISheet[] = [];
	let errorMessage = "";

	try {
		const date = searchParams?.date;
		sheets = await AxiosRequest.get<ISheet[]>(
			`/sheet?status=cancelled${date ? `&date=${date}` : ""}`
		);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl= mb-5">Cancelled Sheets</h1>
				{/* <CreateSheetModal /> */}
			</div>
			<DailySheets sheets={sheets} errorMessage={errorMessage} />
		</div>
	);
}
