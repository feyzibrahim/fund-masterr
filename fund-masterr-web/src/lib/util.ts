export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "IND",
	}).format(amount);
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleString("en-IN", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
}
