"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const accountFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		}),
	email: z
		.string({
			required_error: "Please select an email to display.",
		})
		.email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
	name: "Your Name",
	email: "your-email@example.com",
};

export function AccountForm() {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});

	function onSubmit(data: AccountFormValues) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Your name" {...field} />
							</FormControl>
							<FormDescription>
								This is the name that will be displayed on your profile
								and in emails.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Your email" {...field} />
							</FormControl>
							<FormDescription>
								This is the email that will be used for communications.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update account</Button>
			</form>
		</Form>
	);
}
