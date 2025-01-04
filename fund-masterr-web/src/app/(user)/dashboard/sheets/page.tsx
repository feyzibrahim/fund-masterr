import { UserSheetsTable } from "@/components/user-sheets-table";
import { users } from "@/lib/data";

export default function Home() {
	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-5">User Sheets</h1>
			<UserSheetsTable users={users} />
		</div>
	);
}
