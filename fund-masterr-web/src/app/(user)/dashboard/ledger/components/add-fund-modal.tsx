"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { IndianRupee } from "lucide-react";
import { useState } from "react";
import { AddFundForm } from "./add-fund-form";
import { ILedger } from "@/types/ledger-types";

interface Props {
	ledger?: ILedger;
}

export function AddFundModal({ ledger }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					<IndianRupee className="w-4 h-4" />
					Add Fund
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Fund</DialogTitle>
				</DialogHeader>
				{ledger && <AddFundForm setIsOpen={setIsOpen} ledger={ledger} />}
			</DialogContent>
		</Dialog>
	);
}
