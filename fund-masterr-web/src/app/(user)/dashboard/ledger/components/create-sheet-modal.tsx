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
import { CreateSheetForm } from "./create-sheet-form";

export function CreateSheetModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button>Add Sheet</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Sheets</DialogTitle>
				</DialogHeader>
				<CreateSheetForm setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
}
