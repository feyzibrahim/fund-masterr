"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IContact } from "@/types/contact-types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { updateAgent } from "./action";

interface Props {
	transactionId: string;
	contacts: IContact[];
	type: "agent" | "payer" | "archive";
}

export default function UpdateContactPopover({ transactionId, contacts, type }: Props) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [confirmOpen, setConfirmOpen] = useState(false);

	const getContactName = (val: string) => {
		const contact = contacts.find((contact) => contact._id === val);

		if (contact) {
			return `${contact.firstName ?? ""} ${contact.lastName ?? ""}`;
		}
	};

	const handleConfirmation = async () => {
		const { success, error } = await updateAgent(
			transactionId,
			{
				agent: value,
				payer: value,
			},
			type
		);
	};

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open}>
						{value ? getContactName(value) : `Select ${type}...`}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder={`Search ${type}...`} className="h-9" />
						<CommandList>
							<CommandEmpty>No {type} found.</CommandEmpty>
							<CommandGroup>
								{contacts.map((contact) => (
									<CommandItem
										key={contact._id}
										value={contact._id}
										onSelect={(currentValue) => {
											setValue(
												currentValue === value ? "" : currentValue
											);
										}}
									>
										{contact.firstName ?? ""} {contact.lastName ?? ""}
										<Check
											className={cn(
												"ml-auto",
												value === contact._id
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
					<div className="p-2">
						<Button onClick={() => setConfirmOpen(true)} className=" w-full">
							Save
						</Button>
					</div>
				</PopoverContent>
			</Popover>

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Save</DialogTitle>
						<DialogDescription>
							Are you sure you want to save the changes?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => {
								setConfirmOpen(false);
								setValue("");
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleConfirmation}>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
