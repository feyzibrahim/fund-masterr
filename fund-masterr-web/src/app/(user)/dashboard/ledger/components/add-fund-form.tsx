"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewFund } from "./action";

// Define the Zod schema for validation
const ledgerSchema = z.object({
	amount: z.number().min(0, "Amount is required"),
	ledgerId: z.string(),
});

export type FundFormValues = z.infer<typeof ledgerSchema>;

interface Props {
	setIsOpen: (val: boolean) => void;
}

export function AddFundForm({ setIsOpen }: Props) {
	const params = useParams();
	const ledgerId = params.id as string;

	let [errorMessage, setErrorMessage] = useState("");

	const form = useForm<FundFormValues>({
		resolver: zodResolver(ledgerSchema),
		defaultValues: {
			amount: 0,
			ledgerId: ledgerId,
		},
	});

	const onSubmit = async (data: FundFormValues) => {
		const res = await createNewFund(data, ledgerId);
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

				{errorMessage && <p className="text-red-500">{errorMessage}</p>}

				{/* Submit Button */}
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
