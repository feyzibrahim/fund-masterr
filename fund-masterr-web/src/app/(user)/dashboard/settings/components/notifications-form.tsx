"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { AxiosRequest } from "@/lib/axios.instance";
import { INotification } from "@/types/notification-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateNotification } from "../action";

const notificationsFormSchema = z.object({
	type: z.enum(["all", "mentions", "none"], {
		required_error: "You need to select a notification type.",
	}),
	mobile: z.boolean().default(false).optional(),
	communication_emails: z.boolean().default(false).optional(),
	marketing_emails: z.boolean().default(false).optional(),
	security_emails: z.boolean(),
});

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

interface Props {
	notification: INotification;
}

export function NotificationsForm({ notification }: Props) {
	const defaultValues = {
		type: notification.type,
		mobile: notification.mobile,
		communication_emails: notification.communication_emails,
		marketing_emails: notification.marketing_emails,
		security_emails: notification.security_emails,
	};

	const form = useForm<NotificationsFormValues>({
		resolver: zodResolver(notificationsFormSchema),
		defaultValues,
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(data: NotificationsFormValues) {
		setLoading(true);
		setError(null);

		const res = await updateNotification(data, notification._id);

		if (res.success) {
			toast({
				title: "Success",
				description: "Your notification settings have been updated.",
			});
			setError(null);
		} else {
			setError("Failed to update notification settings.");
			toast({
				title: "Error",
				description: "Failed to update notification settings.",
			});
		}
		setLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Notify me about...</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="all" />
										</FormControl>
										<FormLabel className="font-normal">
											All new messages
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="mentions" />
										</FormControl>
										<FormLabel className="font-normal">
											Sheet delivery & cancellations
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="none" />
										</FormControl>
										<FormLabel className="font-normal">
											Nothing
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="communication_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Communication emails
										</FormLabel>
										<FormDescription>
											Receive emails about your account activity.
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
							name="marketing_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Marketing emails
										</FormLabel>
										<FormDescription>
											Receive emails about new products, features,
											and more.
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
							name="security_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											Security emails
										</FormLabel>
										<FormDescription>
											Receive emails about your account security.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled
											aria-readonly
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>
				<FormField
					control={form.control}
					name="mobile"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>
									Use different settings for my mobile devices
								</FormLabel>
								<FormDescription>
									You can manage your mobile notifications in the{" "}
									<Link href="/examples/forms">mobile settings</Link>{" "}
									page.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={loading}>
					{loading ? "Updating..." : "Update notifications"}
				</Button>
				{error && <p className="text-red-500 text-xs">{error}</p>}
			</form>
		</Form>
	);
}
