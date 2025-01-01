import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TutorialsPage() {
	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-6">Fund-Masterr Tutorials</h1>
			<p className="mb-8">
				Explore our tutorials to learn how to make the most of Fund-Masterr&apos;s
				features:
			</p>
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Account Management Basics</CardTitle>
						<CardDescription>
							Learn the fundamentals of managing your accounts
						</CardDescription>
					</CardHeader>
					<CardContent>
						This tutorial covers adding, editing, and categorizing your
						accounts in Fund-Masterr.
					</CardContent>
					<CardFooter>
						<Button asChild>
							<Link href="/docs/tutorials/account-management">
								Read More
							</Link>
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Advanced Reporting</CardTitle>
						<CardDescription>
							Master Fund-Masterr&apos;s reporting capabilities
						</CardDescription>
					</CardHeader>
					<CardContent>
						Learn how to generate and interpret detailed reports about your
						accounts and financial status.
					</CardContent>
					<CardFooter>
						<Button asChild>
							<Link href="/docs/tutorials/advanced-reporting">
								Read More
							</Link>
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Security Best Practices</CardTitle>
						<CardDescription>Ensure your data stays safe</CardDescription>
					</CardHeader>
					<CardContent>
						Discover the security features of Fund-Masterr and learn how to
						use them effectively.
					</CardContent>
					<CardFooter>
						<Button asChild>
							<Link href="/docs/tutorials/security-practices">
								Read More
							</Link>
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Mobile App Guide</CardTitle>
						<CardDescription>Manage accounts on the go</CardDescription>
					</CardHeader>
					<CardContent>
						A comprehensive guide to using the Fund-Masterr mobile app for
						account management.
					</CardContent>
					<CardFooter>
						<Button asChild>
							<Link href="/docs/tutorials/mobile-app">Read More</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
