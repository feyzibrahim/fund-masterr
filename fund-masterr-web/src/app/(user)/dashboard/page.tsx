import { DashboardChart } from "@/components/dashboard-chart";
import { AxiosRequest } from "@/lib/axios.instance";
import { IStats } from "@/types/stats-types";
import { CopyX, IndianRupee, Layers2, PackageCheck } from "lucide-react";

interface Props {
	params: { id: string };
	searchParams?: { date: string | undefined };
}

function sumStats(stats: IStats[]) {
	return stats.reduce(
		(acc, stat) => {
			acc.totalSheets += stat.totalSheets;
			acc.delivered += stat.delivered;
			acc.cancelled += stat.cancelled;
			acc.totalAmountDelivered += stat.totalAmountDelivered;
			return acc;
		},
		{ totalSheets: 0, delivered: 0, cancelled: 0, totalAmountDelivered: 0 }
	);
}

export default async function Dashboard({ params, searchParams }: Props) {
	let stats: IStats[] | null = null;
	let errorMessage: null | string = null;

	try {
		const date = searchParams?.date;
		stats = await AxiosRequest.get<IStats[]>(
			`/sheet/stats${date ? `?date=${date}` : ""}`
		);
	} catch (error: any) {
		errorMessage = error.message ?? "An error occurred while fetching sheets.";
	}

	if (errorMessage || !stats) {
		return (
			<div className="flex items-center justify-center h-[calc(100vh-4rem)]">
				<p className="text-2xl text-foreground-secondary">{errorMessage}</p>
			</div>
		);
	}

	const totals = sumStats(stats);

	return (
		<div className="space-y-4 px-4 pt-0 w-full">
			<div className="grid gap-4 md:grid-cols-4">
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<Layers2 className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{totals.totalSheets}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Total Sheets</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<PackageCheck className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{totals.delivered}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Delivered</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<CopyX className="w-12 h-12" />
						<h1 className="text-4xl font-bold">{totals.cancelled}</h1>
					</div>
					<p className="text-lg text-foreground-secondary">Cancelled</p>
				</div>
				<div className="rounded-xl bg-muted/50 p-5 space-y-3">
					<div className="flex items-center gap-4">
						<IndianRupee className="w-12 h-12" />
						<h1 className="text-4xl font-bold">
							{totals.totalAmountDelivered}
						</h1>
					</div>
					<p className="text-lg text-foreground-secondary">
						Total Amount Delivered
					</p>
				</div>
			</div>
			<div className="rounded-xl bg-muted/50 p-5">
				<DashboardChart stats={stats} />
			</div>
		</div>
	);
}
