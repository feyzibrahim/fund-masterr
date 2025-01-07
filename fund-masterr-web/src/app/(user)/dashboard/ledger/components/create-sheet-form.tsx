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
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewSheet } from "./action";
import { useParams } from "next/navigation";

// Define the Zod schema for validation
const ledgerSchema = z.object({
	agent: z.string().optional(),
	amount: z.number().min(0, "Amount is required"),
	ledgerId: z.string(),
});

export type SheetFormValues = z.infer<typeof ledgerSchema>;

interface Props {
	setIsOpen: (val: boolean) => void;
}

export function CreateSheetForm({ setIsOpen }: Props) {
	const params = useParams();
	const ledgerId = params.id as string;

	const [agents, setAgents] = useState<IContact[]>([]);
	let [errorMessage, setErrorMessage] = useState("");

	const loadContacts = async () => {
		try {
			const response = await AxiosRequest.get<IContact[]>(`/contact?type=agent`);
			setAgents(response);
		} catch (error: any) {
			setErrorMessage(error.message ?? "An error occurred while fetching agents.");
		}
	};

	useLayoutEffect(() => {
		loadContacts();
	}, []);

	const form = useForm<SheetFormValues>({
		resolver: zodResolver(ledgerSchema),
		defaultValues: {
			agent: "",
			amount: 0,
			ledgerId: ledgerId,
		},
	});

	const onSubmit = async (data: SheetFormValues) => {
		const res = await createNewSheet(data, ledgerId);
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
					name="agent"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<div className="space-y-3">
								<FormLabel>Agent</FormLabel>
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
																agents.find(
																	(agent) =>
																		agent._id ===
																		field.value
																)?.firstName
														  } ${
																agents.find(
																	(agent) =>
																		agent._id ===
																		field.value
																)?.lastName
														  }`
														: "Select agent"}
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
														{agents.map((agent) => (
															<CommandItem
																value={agent._id}
																key={agent._id}
																onSelect={() => {
																	form.setValue(
																		"agent",
																		agent._id
																	);
																}}
															>
																<PopoverClose className="w-full flex items-center ">
																	{agent.firstName}{" "}
																	{agent.lastName ?? ""}
																	<Check
																		className={cn(
																			"ml-auto",
																			agent._id ===
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
