import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MobileAppGuideTutorial() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Fund-Masterr Mobile App Guide</h1>
			<p className="mb-8">
				Learn how to effectively use the Fund-Masterr mobile app to manage your
				accounts on the go. This guide will walk you through the key features and
				functionalities of our mobile application.
			</p>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Getting Started with the Mobile App</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className="list-decimal list-inside space-y-2">
						<li>
							Download the Fund-Masterr app from the App Store (iOS) or
							Google Play Store (Android).
						</li>
						<li>
							Open the app and log in with your existing Fund-Masterr
							credentials.
						</li>
						<li>
							If it&apos;s your first time, you may need to set up biometric
							authentication (fingerprint or face ID).
						</li>
						<li>
							Take a moment to familiarize yourself with the app&apos;s
							layout and navigation.
						</li>
					</ol>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Key Features of the Mobile App</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>Dashboard:</strong> Get a quick overview of your
							accounts and financial status.
						</li>
						<li>
							<strong>Account Management:</strong> View, add, or edit your
							accounts directly from your phone.
						</li>
						<li>
							<strong>Transaction Tracking:</strong> Log transactions
							on-the-go to keep your accounts up-to-date.
						</li>
						<li>
							<strong>Bill Reminders:</strong> Set up and manage bill
							reminders to never miss a payment.
						</li>
						<li>
							<strong>Quick Reports:</strong> Generate and view basic
							financial reports.
						</li>
						<li>
							<strong>Secure Messaging:</strong> Communicate with support
							directly through the app.
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Mobile-Specific Security Features</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Enable biometric authentication for quick and secure access.
						</li>
						<li>
							Use the app&apos;s built-in secure keyboard when entering
							sensitive information.
						</li>
						<li>Set up a PIN code as an additional layer of security.</li>
						<li>
							Enable notifications for account activities to monitor for any
							unauthorized actions.
						</li>
						<li>
							Use the &quot;Logout&quot; button when you&apos;re done to
							ensure your session is closed.
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Syncing Between Mobile and Desktop</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						Fund-Masterr ensures seamless syncing between mobile and desktop:
					</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Changes made on mobile are instantly reflected on the desktop
							version.
						</li>
						<li>
							Ensure you have a stable internet connection for real-time
							syncing.
						</li>
						<li>
							If you encounter sync issues, use the &quot;Force Sync&quot;
							option in the app settings.
						</li>
						<li>
							You can choose to enable offline mode for viewing data without
							an internet connection.
						</li>
					</ul>
				</CardContent>
			</Card>

			<p className="mt-8">
				With the Fund-Masterr mobile app, you have the power to manage your
				finances anytime, anywhere. Remember to keep your app updated to access
				the latest features and security improvements.
			</p>
		</div>
	);
}
