import { DailySheets } from "@/app/(user)/dashboard/ledger/components/daily-sheets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "@/components/user-details";
import { AxiosRequest } from "@/lib/axios.instance";
import { ISheet } from "@/types/sheet-types";
import { AddFundModal } from "../components/add-fund-modal";
import { CreateSheetModal } from "../components/create-sheet-modal";

interface Props {
	params: { id: string };
}

export default async function UserSheetsPage({ params }: Props) {
	let sheets: ISheet[] = [];
	let errorMessage = "";

	try {
		sheets = await AxiosRequest.get<ISheet[]>(`/sheet?ledger=${params.id}`);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	return (
		<div className="space-y-5">
			<UserDetails ledgerId={params.id} sheets={sheets} />
			<Tabs defaultValue="sheets" className="w-">
				<div className="flex items-center justify-between">
					<TabsList className="flex w-fit">
						<TabsTrigger value="sheets">Sheets</TabsTrigger>
						<TabsTrigger value="fund-history">Fund History</TabsTrigger>
					</TabsList>
					<div className="space-x-2">
						<AddFundModal />
						<CreateSheetModal />
					</div>
				</div>
				<TabsContent value="sheets">
					<DailySheets sheets={sheets} errorMessage={errorMessage} hidePayer />
				</TabsContent>
				<TabsContent value="fund-history">
					<div>test</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
