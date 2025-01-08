"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import { CreateSheetForm } from "./create-sheet-form";

export function CreateSheetModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost">
					<FilePlus className="w-4 h-4" />
				</Button>
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
