"use client";

import { CartesianGrid, Bar, BarChart, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { IStats } from "@/types/stats-types";

const chartConfig = {
	totalSheets: {
		label: "Total Sheets",
		color: "#294dff",
	},
	delivered: {
		label: "Delivered",
		color: "#32a852",
	},
	cancelled: {
		label: "Cancelled",
		color: "#ff2942",
	},
	pending: {
		label: "Pending",
		color: "#ffc629",
	},
} satisfies ChartConfig;

interface Props {
	stats: IStats[];
}

export function DashboardChart({ stats }: Props) {
	const chartData = stats.map((stat) => ({
		label: stat.date,
		totalSheets: stat.totalSheets,
		delivered: stat.delivered,
		cancelled: stat.cancelled,
		pending: stat.pending,
	}));

	return (
		<ChartContainer config={chartConfig} className="h-[65vh] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="label"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />

				<Bar dataKey="totalSheets" fill="var(--color-totalSheets)" radius={4} />
				<Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
				<Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
				<Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
