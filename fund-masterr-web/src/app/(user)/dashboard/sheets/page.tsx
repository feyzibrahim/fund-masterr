import { AxiosRequest } from "@/lib/axios.instance";
import { ISheet } from "@/types/sheet-types";
import { SheetTable } from "./components/sheet-table";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function SheetsPage({ params, searchParams }: Props) {
	let sheets: ISheet[] = [];
	let errorMessage = "";

	try {
		const date = searchParams?.date;
		sheets = await AxiosRequest.get<ISheet[]>(`/sheet${date ? `?date=${date}` : ""}`);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl mb-5">Sheets</h1>
				{/* <CreateSheetModal /> */}
			</div>
			<SheetTable sheets={sheets} errorMessage={errorMessage} />
		</div>
	);
}
