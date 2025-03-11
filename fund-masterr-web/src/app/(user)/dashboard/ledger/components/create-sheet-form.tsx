"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AxiosRequest } from "@/lib/axios.instance";
import { cn } from "@/lib/utils";
import { IContact } from "@/types/contact-types";
import { ILedger } from "@/types/ledger-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewSheet } from "./action";

// Define the Zod schema for validation
const ledgerSchema = z.object({
	agent: z.string().optional(),
	payer: z.string().optional(),
	amount: z.number().min(0, "Amount is required"),
	ledgerId: z.string(),
});

export type SheetFormValues = z.infer<typeof ledgerSchema>;

interface Props {
	setIsOpen: (val: boolean) => void;
	ledger: ILedger;
}

export function CreateSheetForm({ setIsOpen, ledger }: Props) {
	const defaultContactType = ledger.contact.type === "agent" ? "payer" : "agent";
	const [contacts, setContacts] = useState<IContact[]>([]);
	let [errorMessage, setErrorMessage] = useState("");

	useLayoutEffect(() => {
		const loadContacts = async () => {
			try {
				const response = await AxiosRequest.get<IContact[]>(
					`/contact?type=${defaultContactType}`
				);
				setContacts(response);
			} catch (error: any) {
				setErrorMessage(
					error.message ?? "An error occurred while fetching contacts."
				);
			}
		};
		loadContacts();
	}, [defaultContactType]);

	const form = useForm<SheetFormValues>({
		resolver: zodResolver(ledgerSchema),
		defaultValues: {
			agent: ledger.contact.type === "agent" ? ledger.contact._id : "",
			payer: ledger.contact.type === "payer" ? ledger.contact._id : "",
			amount: 0,
			ledgerId: ledger._id,
		},
	});

	const onSubmit = async (data: SheetFormValues) => {
		const res = await createNewSheet(data, ledger._id);
		if (res.success) {
			form.reset();
			setIsOpen(false);
		} else {
			setErrorMessage(res.error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Amount Field */}
				<FormField
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter amount"
									{...field}
									value={field.value} // Keep the field value synced
									onChange={
										(e) => field.onChange(e.target.valueAsNumber || 0) // Convert to number
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Agent Field */}
				<FormField
					name={defaultContactType}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<div className="space-y-3">
								<FormLabel className="capitalize">
									{defaultContactType}
								</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													{field.value
														? `${
																contacts.find(
																	(contact) =>
																		contact._id ===
																		field.value
																)?.firstName
														  } ${
																contacts.find(
																	(contact) =>
																		contact._id ===
																		field.value
																)?.lastName
														  }`
														: `Select ${defaultContactType}`}
													<ChevronsUpDown className="opacity-50 w-4 h-4" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="p-0 popover-content-width-full -mt-3">
											<Command>
												<CommandInput
													placeholder="Search framework..."
													className="h-9"
												/>
												<CommandList>
													<CommandEmpty>
														No framework found.
													</CommandEmpty>
													<CommandGroup>
														{contacts.map((contact) => (
															<CommandItem
																value={contact._id}
																key={contact._id}
																onSelect={() => {
																	form.setValue(
																		defaultContactType,
																		contact._id
																	);
																}}
															>
																<PopoverClose className="w-full flex items-center ">
																	{contact.firstName}{" "}
																	{contact.lastName ??
																		""}
																	<Check
																		className={cn(
																			"ml-auto",
																			contact._id ===
																				field.value
																				? "opacity-100"
																				: "opacity-0"
																		)}
																	/>
																</PopoverClose>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{errorMessage && <p className="text-red-500">{errorMessage}</p>}

				{/* Submit Button */}
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
