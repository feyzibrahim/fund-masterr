import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityPracticesTutorial() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">
				Security Best Practices in Fund-Masterr
			</h1>
			<p className="mb-8">
				Discover how to maximize the security of your financial data in
				Fund-Masterr. Follow these best practices to ensure your sensitive
				information remains protected.
			</p>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Strong Password Guidelines</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside space-y-2">
						<li>Use a unique password for your Fund-Masterr account.</li>
						<li>Make it at least 12 characters long.</li>
						<li>
							Include a mix of uppercase and lowercase letters, numbers, and
							symbols.
						</li>
						<li>Avoid using personal information or common words.</li>
						<li>
							Consider using a password manager to generate and store strong
							passwords.
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Enabling Two-Factor Authentication (2FA)</CardTitle>
				</CardHeader>
				<CardContent>
					<ol className="list-decimal list-inside space-y-2">
						<li>Go to your account settings in Fund-Masterr.</li>
						<li>
							Find the &quot;Security&quot; or &quot;Two-Factor
							Authentication&quot; section.
						</li>
						<li>
							Click &quot;Enable 2FA&quot; and choose your preferred method
							(app-based or SMS).
						</li>
						<li>Follow the prompts to set up your chosen 2FA method.</li>
						<li>Store your backup codes in a safe place.</li>
					</ol>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Regular Security Audits</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">Perform these security checks regularly:</p>
					<ul className="list-disc list-inside space-y-2">
						<li>Review your account activity for any suspicious actions.</li>
						<li>Check and update your connected devices list.</li>
						<li>Verify your account recovery options are up-to-date.</li>
						<li>
							Ensure your email address associated with the account is
							secure.
						</li>
						<li>Update your security questions if necessary.</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Safe Browsing Practices</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Always access Fund-Masterr via https://www.fund-masterr.com.
						</li>
						<li>
							Don&apos;t click on links in unsolicited emails claiming to be
							from Fund-Masterr.
						</li>
						<li>Keep your browser and operating system up-to-date.</li>
						<li>Use a reputable antivirus software and keep it updated.</li>
						<li>
							Avoid using public Wi-Fi when accessing your Fund-Masterr
							account.
						</li>
					</ul>
				</CardContent>
			</Card>

			<p className="mt-8">
				By following these security best practices, you can significantly enhance
				the protection of your financial data in Fund-Masterr. Remember, security
				is an ongoing process, so stay vigilant and regularly review your security
				settings.
			</p>
		</div>
	);
}
