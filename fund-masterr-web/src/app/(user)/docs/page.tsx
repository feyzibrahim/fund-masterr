import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export default function IntroductionPage() {
	return (
		<div className="">
			<h1 className="text-4xl font-bold mb-6">Welcome to Fund-Masterr</h1>
			<p className="text-xl mb-8">
				Fund-Masterr is your go-to solution for storing and managing accounts
				efficiently and securely.
			</p>
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Secure Storage</CardTitle>
						<CardDescription>Keep your account data safe</CardDescription>
					</CardHeader>
					<CardContent>
						Fund-Masterr uses state-of-the-art encryption to ensure your
						sensitive account information is always protected.
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Easy Management</CardTitle>
						<CardDescription>Organize accounts effortlessly</CardDescription>
					</CardHeader>
					<CardContent>
						Our intuitive interface allows you to categorize, search, and
						manage your accounts with ease.
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Multi-platform Access</CardTitle>
						<CardDescription>Access anywhere, anytime</CardDescription>
					</CardHeader>
					<CardContent>
						Whether on desktop or mobile, Fund-Masterr ensures your account
						data is always at your fingertips.
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Detailed Reporting</CardTitle>
						<CardDescription>
							Gain insights into your accounts
						</CardDescription>
					</CardHeader>
					<CardContent>
						Generate comprehensive reports to better understand and manage
						your financial landscape.
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
