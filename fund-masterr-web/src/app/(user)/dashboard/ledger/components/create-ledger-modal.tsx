"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateLedgerForm } from "./create-ledger-form";

export function CreateLedgerModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button>Add Ledger</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Ledgers</DialogTitle>
				</DialogHeader>
				<CreateLedgerForm setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
}
