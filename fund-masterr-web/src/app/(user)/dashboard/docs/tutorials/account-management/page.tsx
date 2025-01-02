import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountManagementTutorial() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Account Management Basics</h1>
			<p className="mb-8">
				Learn the fundamentals of managing your accounts in Fund-Masterr. This
				tutorial will cover adding, editing, and categorizing your accounts.
			</p>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Adding a New Account</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className="list-decimal list-inside space-y-2">
						<li>
							Click on the &quot;Add Account&quot; button in the dashboard.
						</li>
						<li>
							Choose the account type (e.g., Checking, Savings, Credit
							Card).
						</li>
						<li>
							Enter the account details, including name, balance, and
							institution.
						</li>
						<li>
							Set up any recurring transactions or bills associated with
							this account.
						</li>
						<li>
							Click &quot;Save&quot; to add the account to your Fund-Masterr
							dashboard.
						</li>
					</ol>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Editing Account Information</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className="list-decimal list-inside space-y-2">
						<li>Locate the account you want to edit on your dashboard.</li>
						<li>
							Click the &quot;Edit&quot; button (usually represented by a
							pencil icon).
						</li>
						<li>Update the necessary information in the edit form.</li>
						<li>
							Don&apos;t forget to update the balance if it has changed.
						</li>
						<li>Click &quot;Save&quot; to apply your changes.</li>
					</ol>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Categorizing Accounts</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						Proper categorization helps you organize and analyze your finances
						more effectively:
					</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Use preset categories like &quot;Personal&quot;,
							&quot;Business&quot;, or &quot;Investments&quot;.
						</li>
						<li>
							Create custom categories that fit your unique financial
							situation.
						</li>
						<li>Assign categories when adding or editing an account.</li>
						<li>
							Use the &quot;Bulk Edit&quot; feature to categorize multiple
							accounts at once.
						</li>
					</ul>
				</CardContent>
			</Card>

			<p className="mt-8">
				By mastering these basics, you&apos;ll be well on your way to effectively
				managing your accounts with Fund-Masterr. Remember, consistent updates and
				proper categorization are key to maintaining an accurate financial
				picture.
			</p>
		</div>
	);
}
