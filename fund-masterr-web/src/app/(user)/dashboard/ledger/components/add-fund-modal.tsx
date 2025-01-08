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

export function AddFundModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<IndianRupee className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Fund</DialogTitle>
				</DialogHeader>
				<AddFundForm setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
}
