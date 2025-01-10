import { DailySheets } from "../components/daily-sheets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "../components/user-details";
import { AddFundModal } from "../components/add-fund-modal";
import { CreateSheetModal } from "../components/create-sheet-modal";
import { getFunds, getLedger, getSheets } from "./action";
import { FundsTable } from "../components/funds-table";

interface Props {
	params: { id: string };
}

export default async function UserSheetsPage({ params }: Props) {
	let { sheets, error: sheetsError } = await getSheets(params.id);
	let { funds, error: fundsError } = await getFunds(params.id);
	let { ledger } = await getLedger(params.id);

	return (
		<div className="space-y-5">
			<UserDetails sheets={sheets} funds={funds} ledger={ledger} />
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
					<DailySheets
						sheets={sheets}
						errorMessage={sheetsError}
						ledger={ledger}
					/>
				</TabsContent>
				<TabsContent value="fund-history">
					<FundsTable funds={funds} errorMessage={fundsError} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
