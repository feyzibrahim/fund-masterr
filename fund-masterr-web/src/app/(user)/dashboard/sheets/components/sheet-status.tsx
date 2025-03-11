import { CheckCircle, CopyX, Timer } from "lucide-react";

interface Props {
	status: "delivered" | "pending" | "cancelled";
}

export default function SheetStatus({ status }: Props) {
	const data = [
		{
			status: "delivered",
			bgColor: "bg-green-800",
			icon: <CheckCircle className="w-4 h-4 text-green-500" />,
		},
		{
			status: "pending",
			bgColor: "bg-blue-800",
			icon: <Timer className="w-4 h-4 text-blue-500" />,
		},
		{
			status: "cancelled",
			bgColor: "bg-red-800",
			icon: <CopyX className="w-4 h-4 text-red-500" />,
		},
	];

	const selectedData = data.find((d) => d.status === status);

	if (!selectedData) {
		return null;
	}

	return (
		<div
			className={`capitalize flex items-center gap-2 rounded-md bg-opacity-20 px-2 py-1 w-fit ${selectedData.bgColor}`}
		>
			{selectedData.icon}
			{status}
		</div>
	);
}
