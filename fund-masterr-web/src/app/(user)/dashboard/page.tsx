import { DashboardChart } from "@/components/dashboard-chart";
import { AxiosRequest } from "@/lib/axios.instance";
import { CopyX, IndianRupee, Layers2, PackageCheck } from "lucide-react";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

export default async function Dashboard({ params, searchParams }: Props) {
	let stats: any;
	let errorMessage = "";

	try {
		const date = searchParams?.date;
		stats = await AxiosRequest.get<{
			_id: null;
			totalSheets: number;
			delivered: number;
			cancelled: number;
			pending: number;
			totalAmountDelivered: number;
		}>(`/sheet/stats${date ? `?date=${date}` : ""}`);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	return (
		<div className="space-y-4 px-4 pt-0 w-full">
			<div className="grid gap-4 md:grid-cols-4">
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<Layers2 className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{stats.totalSheets}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Total Sheets</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<PackageCheck className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{stats.delivered}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Delivered</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<CopyX className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{stats.cancelled}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Cancelled</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<IndianRupee className="w-12 h-12" />
						<h1 className="text-4xl font-bold">
							{stats.totalAmountDelivered}
						</h1>
					</div>
					<p className="text-lg text-foreground-secondary">
						Total Amount Delivered
					</p>
				</div>
			</div>
			<DashboardChart />
		</div>
	);
}
