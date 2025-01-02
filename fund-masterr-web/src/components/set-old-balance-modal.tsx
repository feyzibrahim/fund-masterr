"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SetOldBalanceModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSetOldBalance: (amount: number) => void;
};

export function SetOldBalanceModal({
	isOpen,
	onClose,
	onSetOldBalance,
}: SetOldBalanceModalProps) {
	const [amount, setAmount] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const parsedAmount = parseFloat(amount);
		if (!isNaN(parsedAmount)) {
			onSetOldBalance(parsedAmount);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Set Old Balance</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="amount" className="text-right">
								Amount
							</Label>
							<Input
								id="amount"
								type="number"
								step="0.01"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Set Balance</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
