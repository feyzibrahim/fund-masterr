import { sheets } from "@/lib/data";
import { AllSheetsTable } from "../components/all-sheets-table";

export default function History() {
	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">Sheets</h1>
			<AllSheetsTable sheets={sheets} />
		</div>
	);
}
