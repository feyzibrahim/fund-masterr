import type { Metadata } from "next";
import { BillingHeader } from "@/app/(user)/dashboard/billing/components/billing-header";
import { SubscriptionDetails } from "@/app/(user)/dashboard/billing/components/subscription-details";
import { BillingHistory } from "@/app/(user)/dashboard/billing/components/billing-history";
import { PaymentMethods } from "@/app/(user)/dashboard/billing/components/payment-methods";
import { PlanOptions } from "@/app/(user)/dashboard/billing/components/plan-options";

export const metadata: Metadata = {
	title: "Billing",
	description: "Manage your subscription and billing details",
};

export default function BillingPage() {
	return (
		<div className="space-y-8">
			<BillingHeader />
			<div className="grid gap-8 md:grid-cols-2">
				<SubscriptionDetails />
				<PaymentMethods />
			</div>
			<BillingHistory />
			<PlanOptions />
		</div>
	);
}
