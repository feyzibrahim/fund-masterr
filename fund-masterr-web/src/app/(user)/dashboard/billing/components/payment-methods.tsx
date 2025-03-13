"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function PaymentMethods() {
	const [open, setOpen] = useState(false);

	// This would typically come from your payment API
	const paymentMethods: any[] = [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Methods</CardTitle>
				<CardDescription>Manage your payment methods</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{paymentMethods.length > 0 &&
					paymentMethods.map((method) => (
						<div
							key={method.id}
							className="flex items-center justify-between rounded-lg border p-4"
						>
							<div className="flex items-center space-x-4">
								<div className="rounded-md bg-primary/10 p-2">
									<CreditCard className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="font-medium capitalize">
										{method.brand} •••• {method.last4}
										{method.isDefault && (
											<span className="ml-2 text-xs text-muted-foreground">
												Default
											</span>
										)}
									</p>
									<p className="text-sm text-muted-foreground">
										Expires {method.expMonth}/{method.expYear}
									</p>
								</div>
							</div>
							<Button variant="ghost" size="sm">
								Edit
							</Button>
						</div>
					))}
			</CardContent>
			<CardFooter>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="w-full">
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Payment Method
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Payment Method</DialogTitle>
							<DialogDescription>
								Add a new credit or debit card to your account.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="card-number">Card Number</Label>
								<Input
									id="card-number"
									placeholder="1234 5678 9012 3456"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="expiry">Expiry Date</Label>
									<Input id="expiry" placeholder="MM/YY" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="cvc">CVC</Label>
									<Input id="cvc" placeholder="123" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="name">Name on Card</Label>
								<Input id="name" placeholder="John Doe" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<Select defaultValue="us">
									<SelectTrigger id="country">
										<SelectValue placeholder="Select country" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="us">United States</SelectItem>
										<SelectItem value="ca">Canada</SelectItem>
										<SelectItem value="uk">United Kingdom</SelectItem>
										<SelectItem value="au">Australia</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="postal-code">Postal Code</Label>
								<Input id="postal-code" placeholder="12345" />
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setOpen(false)}>
								Add Payment Method
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
