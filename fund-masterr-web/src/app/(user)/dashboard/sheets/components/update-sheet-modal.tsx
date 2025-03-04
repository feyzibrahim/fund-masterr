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
import { UpdateSheetForm } from "./update-sheet-form";

interface Props {
	sheetId: string;
}

export function UpdateSheetModal({ sheetId }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button variant="outline">Update</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Sheet</DialogTitle>
				</DialogHeader>
				<UpdateSheetForm setIsOpen={setIsOpen} sheetId={sheetId} />
			</DialogContent>
		</Dialog>
	);
}
