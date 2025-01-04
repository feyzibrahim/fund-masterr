export type User = {
	id: string;
	name: string;
	email: string;
	balance: number;
	oldBalance?: number;
	lastSheet: {
		amount: number;
		type: "credit" | "debit";
		date: string;
	};
};

export type Sheet = {
	id: string;
	userId: string;
	amount: number;
	type: "credit" | "debit";
	date: string;
	status: "completed" | "pending" | "cancelled";
};

export const users: User[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		balance: 5000,
		oldBalance: 4500,
		lastSheet: {
			amount: 100,
			type: "credit",
			date: "2023-06-15T10:30:00Z",
		},
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		balance: 7500,
		oldBalance: 8000,
		lastSheet: {
			amount: 250,
			type: "debit",
			date: "2023-06-14T15:45:00Z",
		},
	},
];

export const sheets: Sheet[] = [
	{
		id: "t1",
		userId: "1",
		amount: 100,
		type: "credit",
		date: "2023-06-15T10:30:00Z",
		status: "completed",
	},
	{
		id: "t2",
		userId: "1",
		amount: 50,
		type: "debit",
		date: "2023-06-15T14:20:00Z",
		status: "completed",
	},
	{
		id: "t3",
		userId: "1",
		amount: 75,
		type: "credit",
		date: "2023-06-15T16:45:00Z",
		status: "completed",
	},
	{
		id: "t4",
		userId: "1",
		amount: 25,
		type: "debit",
		date: "2023-06-15T18:30:00Z",
		status: "cancelled",
	},
	{
		id: "t5",
		userId: "2",
		amount: 250,
		type: "debit",
		date: "2023-06-14T15:45:00Z",
		status: "completed",
	},
	{
		id: "t6",
		userId: "2",
		amount: 1000,
		type: "credit",
		date: "2023-06-15T09:00:00Z",
		status: "completed",
	},
	{
		id: "t7",
		userId: "2",
		amount: 150,
		type: "debit",
		date: "2023-06-15T11:30:00Z",
		status: "completed",
	},
	{
		id: "t8",
		userId: "2",
		amount: 100,
		type: "debit",
		date: "2023-06-15T14:15:00Z",
		status: "cancelled",
	},
];

export function getUserSheets(userId: string, date: string): Sheet[] {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	return sheets.filter((t) => t.userId === userId);
}

export function getUserById(userId: string): User | undefined {
	return users.find((u) => u.id === userId);
}

export function calculateDailyStats(userId: string, date: string) {
	const dailySheets = getUserSheets(userId, date);
	const completedSheets = dailySheets.filter((t) => t.status === "completed");
	const cancelledSheets = dailySheets.filter((t) => t.status === "cancelled");

	const totalCompleted = completedSheets.reduce(
		(sum, t) => sum + (t.type === "credit" ? t.amount : -t.amount),
		0
	);
	const totalCancelled = cancelledSheets.reduce((sum, t) => sum + t.amount, 0);

	return {
		sheetCount: dailySheets.length,
		cancelledCount: cancelledSheets.length,
		totalCancelled,
		netTotal: totalCompleted,
	};
}
