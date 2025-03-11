"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ILedger } from "@/types/ledger-types";
import { Layers2 } from "lucide-react";
import { useState } from "react";
import { CreateSheetForm } from "./create-sheet-form";

interface Props {
	ledger?: ILedger;
}

export function CreateSheetModal({ ledger }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					<Layers2 className="w-4 h-4" />
					Add Sheet
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Sheets</DialogTitle>
				</DialogHeader>
				{ledger && <CreateSheetForm setIsOpen={setIsOpen} ledger={ledger} />}
			</DialogContent>
		</Dialog>
	);
}
