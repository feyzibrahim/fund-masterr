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
import { toast } from "@/hooks/use-toast";
import { AxiosRequest } from "@/lib/axios.instance";
import { IUser } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const accountFormSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().optional(),
	phoneNumber: z.coerce.number().optional(),
	profileImg: z.instanceof(File).optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface Props {
	user: IUser;
}

export function AccountForm({ user }: Props) {
	const defaultValues: Partial<AccountFormValues> = {
		firstName: user.firstName ?? "",
		lastName: user.lastName ?? "",
		email: user.email ?? "",
		password: "",
		phoneNumber: user.phoneNumber ?? undefined,
		profileImg: undefined,
	};

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});
	const [profileImgPreview, setProfileImgPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state

	async function onSubmit(data: AccountFormValues) {
		setLoading(true);
		setError(null);
		const formData = new FormData();
		if (data.firstName) formData.append("firstName", data.firstName);
		if (data.lastName) formData.append("lastName", data.lastName);
		if (data.email) formData.append("email", data.email);
		if (data.password) formData.append("password", data.password);
		if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber.toString());
		if (data.profileImg) {
			formData.append("profileImg", data.profileImg);
		}

		try {
			await AxiosRequest.patch(`/user/${user._id}`, formData);
			toast({
				title: "Account updated successfully",
			});
			window.location.reload(); // Reload the entire application
		} catch (err) {
			setError("Failed to update account. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	function handleProfileImgChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			setProfileImgPreview(URL.createObjectURL(file));
			form.setValue("profileImg", file);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="profileImg"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Profile Image</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-4">
									{profileImgPreview && (
										<Image
											src={profileImgPreview}
											alt="Profile Preview"
											className="w-16 h-16 rounded-full"
											width={64}
											height={64}
										/>
									)}
									<Input
										type="file"
										accept="image/*"
										onChange={handleProfileImgChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Your first name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Your last name" {...field} />
							</FormControl>
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Your phone number"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={loading}>
					{loading ? "Updating..." : "Update account"}
				</Button>
				{/* Display error message */}
				{error && <div className="text-red-500 text-xs">{error}</div>}
			</form>
		</Form>
	);
}
