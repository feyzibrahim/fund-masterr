import { AxiosRequest } from "@/lib/axios.instance";
import { ILedger } from "@/types/ledger-types";
import { LedgerTable } from "../components/ledger-table";
import { CreateLedgerModal } from "../components/create-ledger-modal";
import { ShowActiveTodayToggle } from "../components/show-active-today-toggle";

interface Props {
	params: { slug: string };
	searchParams?: { date: string | undefined; activeToday: string | undefined };
}

export default async function Home({ params, searchParams }: Props) {
	let ledgers: ILedger[] = [];
	let errorMessage = "";

	try {
		const date = searchParams?.date;
		const activeToday = searchParams?.activeToday;

		// Construct the query parameters dynamically
		const queryParams = new URLSearchParams();
		queryParams.append("type", "agent");
		if (date) queryParams.append("date", date);
		if (activeToday) queryParams.append("activeToday", activeToday);

		// Construct the full URL
		const url = `/ledger${
			queryParams.toString() ? `?${queryParams.toString()}` : ""
		}`;

		// Make the API request
		ledgers = await AxiosRequest.get<ILedger[]>(url);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching ledgers.";
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl mb-5">Ledger</h1>
				<div className="flex items-center gap-5">
					<ShowActiveTodayToggle />
					<CreateLedgerModal />
				</div>
			</div>
			<LedgerTable ledgers={ledgers} errorMessage={errorMessage} />
		</div>
	);
}
