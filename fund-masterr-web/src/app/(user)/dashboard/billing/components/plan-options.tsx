"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PlanOptions() {
	const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
		"monthly"
	);

	// This would typically come from your pricing API
	const plans = [
		{
			id: "starter",
			name: "Starter",
			description: "Perfect for trying out the fund-masterr",
			price: {
				monthly: "₹0",
				yearly: "₹0",
			},
			features: [
				"Limited for 30 Days",
				"Unlimited Ledger",
				"Unlimited Contacts",
				"Unlimited Sheets",
			],
			current: true,
		},
		{
			id: "pro",
			name: "Pro",
			description: "Ideal for professionals and growing teams",
			price: {
				monthly: "₹1000",
				yearly: "₹10000",
			},
			features: ["Unlimited Ledger", "Unlimited Contacts", "Unlimited Sheets"],
			current: false,
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Plans</CardTitle>
				<CardDescription>Choose the right plan for your needs</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<Tabs defaultValue="monthly" className="w-full">
					<div className="flex justify-center">
						<TabsList>
							<TabsTrigger
								value="monthly"
								onClick={() => setBillingInterval("monthly")}
							>
								Monthly
							</TabsTrigger>
							<TabsTrigger
								value="yearly"
								onClick={() => setBillingInterval("yearly")}
							>
								Yearly{" "}
								<span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
									Save 20%
								</span>
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="monthly" className="mt-6">
						<div className="grid gap-6 md:grid-cols-2">
							{plans.map((plan) => (
								<PlanCard
									key={plan.id}
									plan={plan}
									billingInterval={billingInterval}
								/>
							))}
						</div>
					</TabsContent>

					<TabsContent value="yearly" className="mt-6">
						<div className="grid gap-6 md:grid-cols-2">
							{plans.map((plan) => (
								<PlanCard
									key={plan.id}
									plan={plan}
									billingInterval={billingInterval}
								/>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

interface PlanCardProps {
	plan: {
		id: string;
		name: string;
		description: string;
		price: {
			monthly: string;
			yearly: string;
		};
		features: string[];
		current: boolean;
	};
	billingInterval: "monthly" | "yearly";
}

function PlanCard({ plan, billingInterval }: PlanCardProps) {
	return (
		<div
			className={`rounded-lg border p-6 ${
				plan.current ? "border-primary bg-primary/5" : ""
			}`}
		>
			<div className="space-y-4">
				<h3 className="text-xl font-bold">{plan.name}</h3>
				<p className="text-sm text-muted-foreground">{plan.description}</p>
				<div className="flex items-baseline">
					<span className="text-3xl font-bold">
						{plan.price[billingInterval]}
					</span>
					{billingInterval === "monthly" ? (
						<span className="ml-1 text-sm text-muted-foreground">/month</span>
					) : (
						<span className="ml-1 text-sm text-muted-foreground">/year</span>
					)}
				</div>
				<ul className="space-y-2">
					{plan.features.map((feature, index) => (
						<li key={index} className="flex items-center text-sm">
							<Check className="mr-2 h-4 w-4 text-primary" />
							{feature}
						</li>
					))}
				</ul>
				<Button
					variant={plan.current ? "secondary" : "default"}
					className="w-full"
					disabled={plan.current}
				>
					{plan.current ? "Current Plan" : "Upgrade"}
				</Button>
			</div>
		</div>
	);
}
