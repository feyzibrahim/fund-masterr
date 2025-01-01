import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdvancedReportingTutorial() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">
				Advanced Reporting in Fund-Masterr
			</h1>
			<p className="mb-8">
				Learn how to leverage Fund-Masterr&apos;s powerful reporting tools to gain
				deeper insights into your financial status and make informed decisions.
			</p>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Generating Custom Reports</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className="list-decimal list-inside space-y-2">
						<li>
							Navigate to the &quot;Reports&quot; section in your dashboard.
						</li>
						<li>Click on &quot;Create Custom Report&quot;.</li>
						<li>Select the accounts you want to include in the report.</li>
						<li>Choose the date range for your report.</li>
						<li>
							Select the metrics you want to analyze (e.g., income,
							expenses, net worth).
						</li>
						<li>
							Choose your preferred visualization (e.g., pie chart, bar
							graph, line chart).
						</li>
						<li>
							Click &quot;Generate Report&quot; to view your custom
							insights.
						</li>
					</ol>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Understanding Key Metrics</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>Net Worth:</strong> Total assets minus total
							liabilities.
						</li>
						<li>
							<strong>Cash Flow:</strong> Income minus expenses over a
							specific period.
						</li>
						<li>
							<strong>Debt-to-Income Ratio:</strong> Total monthly debt
							payments divided by gross monthly income.
						</li>
						<li>
							<strong>Savings Rate:</strong> Percentage of income saved or
							invested.
						</li>
						<li>
							<strong>Investment Performance:</strong> Return on investment
							accounts over time.
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Exporting and Sharing Reports</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						Fund-Masterr allows you to export and share your financial
						reports:
					</p>
					<ol className="list-decimal list-inside space-y-2">
						<li>Generate your desired report.</li>
						<li>
							Click the &quot;Export&quot; button at the top of the report.
						</li>
						<li>Choose your preferred format (PDF, CSV, or Excel).</li>
						<li>
							To share, use the &quot;Share&quot; button and enter the
							recipient&apos;s email.
						</li>
						<li>Set permissions (view-only or edit) for shared reports.</li>
					</ol>
				</CardContent>
			</Card>

			<p className="mt-8">
				By mastering these advanced reporting techniques, you&apos;ll be able to
				gain valuable insights into your financial health and make data-driven
				decisions to improve your financial future.
			</p>
		</div>
	);
}
