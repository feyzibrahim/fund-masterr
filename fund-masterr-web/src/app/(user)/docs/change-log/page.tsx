import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ChangelogPage() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Fund-Masterr Changelog</h1>
			<p className="mb-8">
				Stay up to date with the latest changes and improvements to Fund-Masterr:
			</p>
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Version 1.2.0 (Latest)</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-2">
							Released on June 15, 2023
						</p>
						<ul className="list-disc pl-6">
							<li>
								Added multi-currency support for international accounts
							</li>
							<li>
								Improved dashboard performance for users with many
								accounts
							</li>
							<li>
								Introduced new &quot;Quick Add&quot; feature for faster
								account creation
							</li>
							<li>Fixed bug related to exporting reports in CSV format</li>
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Version 1.1.0</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-2">
							Released on May 1, 2023
						</p>
						<ul className="list-disc pl-6">
							<li>Launched mobile app for iOS and Android</li>
							<li>Added ability to set custom categories for accounts</li>
							<li>Improved search functionality with advanced filters</li>
							<li>Fixed several UI issues on smaller screens</li>
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Version 1.0.0</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-2">
							Released on April 1, 2023
						</p>
						<ul className="list-disc pl-6">
							<li>Initial release of Fund-Masterr</li>
							<li>Basic account management features</li>
							<li>Secure storage and encryption of account data</li>
							<li>Simple reporting and data export options</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
