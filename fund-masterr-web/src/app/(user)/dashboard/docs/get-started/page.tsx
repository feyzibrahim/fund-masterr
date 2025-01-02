import { Steps, StepItem } from "@/components/ui/steps";

export default function GetStartedPage() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Getting Started with Fund-Masterr</h1>
			<p className="mb-8">
				Follow these steps to begin your journey with Fund-Masterr and start
				managing your accounts effectively:
			</p>
			<Steps>
				<StepItem title="Sign Up" description="Create your Fund-Masterr account">
					Visit our website and click on the &quot;Sign Up&quot; button. Fill in
					your details and verify your email address.
				</StepItem>
				<StepItem
					title="Set Up Security"
					description="Enhance your account protection"
				>
					Enable two-factor authentication and set up security questions to add
					an extra layer of security to your account.
				</StepItem>
				<StepItem
					title="Add Your First Account"
					description="Start populating your Fund-Masterr"
				>
					Click on &quot;Add Account&quot; and enter the details of your first
					account. You can add as many accounts as you need.
				</StepItem>
				<StepItem
					title="Explore Features"
					description="Familiarize yourself with Fund-Masterr"
				>
					Take a tour of the dashboard, try out the search functionality, and
					explore the reporting features.
				</StepItem>
			</Steps>
			<p className="mt-8">
				For more detailed information on each step, check out our tutorials
				section.
			</p>
		</div>
	);
}
