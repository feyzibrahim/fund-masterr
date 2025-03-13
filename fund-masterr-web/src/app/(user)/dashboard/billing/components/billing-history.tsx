import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export function BillingHistory() {
	// This would typically come from your billing API
	const invoices: any[] = [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Billing History</CardTitle>
				<CardDescription>View and download your past invoices</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-20">
									No billing history available
								</TableCell>
							</TableRow>
						) : (
							invoices.map((invoice) => (
								<TableRow key={invoice.id}>
									<TableCell className="font-medium">
										{invoice.id}
									</TableCell>
									<TableCell>{invoice.date}</TableCell>
									<TableCell>{invoice.amount}</TableCell>
									<TableCell>
										<Badge
											variant={
												invoice.status === "paid"
													? "default"
													: "destructive"
											}
											className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
										>
											{invoice.status}
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="icon">
											<Download className="h-4 w-4" />
											<span className="sr-only">
												Download invoice
											</span>
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
