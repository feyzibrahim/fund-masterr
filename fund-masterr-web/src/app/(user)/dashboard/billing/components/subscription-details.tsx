import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Check } from "lucide-react";

export function SubscriptionDetails() {
	// This would typically come from your subscription API
	const subscription = {
		plan: "Free",
		status: "active",
		price: "₹0",
		billingPeriod: "-",
		renewalDate: "April 14, 2025",
		features: [
			"Limited for 30 Days",
			"Unlimited Ledger",
			"Unlimited Contacts",
			"Unlimited Sheets",
		],
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					Current Plan
					<Badge variant="outline" className="ml-2">
						{subscription.status}
					</Badge>
				</CardTitle>
				<CardDescription>Your subscription details</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<div className="flex items-baseline">
						<span className="text-3xl font-bold">{subscription.plan}</span>
						<span className="ml-2 text-muted-foreground">
							{subscription.price}/{subscription.billingPeriod}
						</span>
					</div>
					<div className="mt-1 flex items-center text-sm text-muted-foreground">
						<CalendarClock className="mr-1 h-4 w-4" />
						Renews on {subscription.renewalDate}
					</div>
				</div>

				<div className="space-y-2">
					<h4 className="text-sm font-medium">Plan includes:</h4>
					<ul className="space-y-2">
						{subscription.features.map((feature, index) => (
							<li key={index} className="flex items-center text-sm">
								<Check className="mr-2 h-4 w-4 text-primary" />
								{feature}
							</li>
						))}
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="w-full">
					Change Plan
				</Button>
			</CardFooter>
		</Card>
	);
}
