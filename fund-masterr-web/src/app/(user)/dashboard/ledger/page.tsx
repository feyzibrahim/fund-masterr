import { AxiosRequest } from "@/lib/axios.instance";
import { ILedger } from "@/types/ledger-types";
import { LedgerTable } from "./components/ledger-table";
import { CreateLedgerModal } from "./components/create-ledger-modal";

export default async function Home() {
	let ledgers: ILedger[] = [];
	let errorMessage = "";

	try {
		ledgers = await AxiosRequest.get<ILedger[]>(`/ledger`);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching ledgers.";
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold mb-5">Ledger</h1>
				<CreateLedgerModal />
			</div>
			<LedgerTable ledgers={ledgers} errorMessage={errorMessage} />
		</div>
	);
}
