import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BillingHeader() {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" asChild>
						<Link href="/dashboard">
							<ArrowLeft className="h-4 w-4" />
							<span className="sr-only">Back to Dashboard</span>
						</Link>
					</Button>
					<h1 className="text-2xl font-bold tracking-tight">Billing</h1>
				</div>
				<p className="text-muted-foreground">
					Manage your subscription and billing details
				</p>
			</div>
			{/* <Button>Contact Support</Button> */}
		</div>
	);
}
