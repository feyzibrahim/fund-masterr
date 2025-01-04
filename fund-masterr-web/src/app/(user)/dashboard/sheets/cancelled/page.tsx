import { sheets } from "@/lib/data";
import { CancelledSheetsTable } from "../components/cancelled-sheets-table";

export default function CancelledSheets() {
	const cancelledSheets = sheets.filter((t) => t.status === "cancelled");

	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">Cancelled Sheets</h1>
			<CancelledSheetsTable sheets={cancelledSheets} />
		</div>
	);
}
