import { getSession } from "@/lib/auth-utils";
import { getSheets } from "./action";
import { SheetTable } from "./components/sheet-table";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function SheetsPage({ params, searchParams }: Props) {
	const { transactions, error: errorMessage } = await getSheets(searchParams?.date);
	const session = await getSession();
	if (!session) return null;

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl mb-5">Sheets</h1>
				{/* <CreateSheetModal /> */}
			</div>
			<SheetTable
				transactions={transactions}
				errorMessage={errorMessage}
				showAgent={session.role === "payer"}
				showPayer={session.role === "payer"}
			/>
		</div>
	);
}
