"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { createNewContact } from "./action";

// Define the Zod schema for validation
const contactSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
	address: z.string().optional(),
	avatar: z.instanceof(File).optional(),
	type: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	type: "agent" | "payer";
}

export function CreateContactForm({ setIsOpen, type }: Props) {
	const ref = useRef<HTMLInputElement | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [error, setError] = useState<string>();

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			address: "",
			avatar: undefined,
			type,
		},
	});

	const onSubmit = async (data: ContactFormValues) => {
		const res = await createNewContact(data, type);
		if (res.success) {
			form.reset();
			setImagePreview(null);
			setIsOpen(false);
		} else {
			setError(res.error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<div className="flex items-center space-x-4">
					<Avatar className="h-24 w-24 mt-3">
						{imagePreview && <AvatarImage src={imagePreview} alt="Avatar" />}
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div
						className="flex flex-col gap-2"
						onClick={(e) => e.stopPropagation()}
					>
						<FormLabel htmlFor="avatar">Upload Photo</FormLabel>
						<Button
							variant="outline"
							onClick={() => ref.current?.click()}
							type="button"
						>
							<Upload className="mr-2 h-4 w-4" />
							Upload Photo
						</Button>
						<Input
							ref={ref}
							id="avatar"
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
									const reader = new FileReader();
									reader.onloadend = () => {
										setImagePreview(reader.result as string);
									};
									reader.readAsDataURL(file);
									form.setValue("avatar", file);
								}
							}}
							className="hidden"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<FormField
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="johndoe@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder="+91 00000-00000" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea
									placeholder="123 Main St, City, Country"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Create Contact</Button>
				{error && <p className="text-red-500">{error}</p>}
			</form>
		</Form>
	);
}
