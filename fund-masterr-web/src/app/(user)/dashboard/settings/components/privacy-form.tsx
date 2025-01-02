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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const privacyFormSchema = z.object({
	profile_visibility: z.enum(["public", "private", "friends"], {
		required_error: "You need to select a profile visibility option.",
	}),
	allow_friend_requests: z.boolean().default(true).optional(),
	show_email: z.boolean().default(false).optional(),
});

type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<PrivacyFormValues> = {
	profile_visibility: "public",
	allow_friend_requests: true,
	show_email: false,
};

export function PrivacyForm() {
	const form = useForm<PrivacyFormValues>({
		resolver: zodResolver(privacyFormSchema),
		defaultValues,
	});

	function onSubmit(data: PrivacyFormValues) {
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
					name="profile_visibility"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Profile Visibility</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="public" />
										</FormControl>
										<FormLabel className="font-normal">
											Public
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="private" />
										</FormControl>
										<FormLabel className="font-normal">
											Private
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="friends" />
										</FormControl>
										<FormLabel className="font-normal">
											Friends Only
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="allow_friend_requests"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">
									Allow Friend Requests
								</FormLabel>
								<FormDescription>
									Receive friend requests from other users.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="show_email"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">
									Show Email Address
								</FormLabel>
								<FormDescription>
									Display your email address on your public profile.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Update privacy settings</Button>
			</form>
		</Form>
	);
}
