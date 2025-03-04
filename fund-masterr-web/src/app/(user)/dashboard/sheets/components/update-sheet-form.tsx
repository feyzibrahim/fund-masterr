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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateSheet } from "./action";

// Define the Zod schema for validation
const updateFormSchema = z.object({
	status: z.enum(["delivered", "cancelled"]),
	remarks: z.string().optional(),
	file: z.any().optional(),
	sheetId: z.string(),
});

export type UpdateSheetForm = z.infer<typeof updateFormSchema>;

interface Props {
	setIsOpen: (val: boolean) => void;
	sheetId: string;
}

export function UpdateSheetForm({ setIsOpen, sheetId }: Props) {
	let [errorMessage, setErrorMessage] = useState("");

	const form = useForm<UpdateSheetForm>({
		resolver: zodResolver(updateFormSchema),
		defaultValues: {
			status: "delivered",
			remarks: "",
			file: null,
			sheetId: sheetId,
		},
	});

	const onSubmit = async (data: UpdateSheetForm) => {
		const formData = new FormData();
		formData.append("status", data.status);
		formData.append("remarks", data.remarks || "");
		if (data.file) {
			formData.append("file", data.file[0]);
		}

		const res = await updateSheet(formData, sheetId);
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
				{/* Status Field */}
				<FormField
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="delivered">
											Delivered
										</SelectItem>
										<SelectItem value="cancelled">
											Cancelled
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Remarks Field */}
				<FormField
					name="remarks"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Remarks</FormLabel>
							<FormControl>
								<Input placeholder="Enter remarks" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* File Upload Field */}
				<FormField
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Upload File</FormLabel>
							<FormControl>
								<Input
									type="file"
									{...field}
									onChange={(e) => field.onChange(e.target.files)}
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
