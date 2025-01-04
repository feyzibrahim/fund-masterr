"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the Zod schema for validation
const contactSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
	address: z.string().optional(),
	avatar: z
		.instanceof(File)
		.optional()
		.refine(
			(file: any) => file?.size < 5 * 1024 * 1024,
			"File size must be less than 5MB"
		),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function CreatePayerForm() {
	const ref = useRef<HTMLInputElement | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = (data: ContactFormValues) => {
		console.log("Form submitted:", data);
		reset();
		setImagePreview(null);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="flex items-center space-x-4">
				<Avatar className="h-24 w-24 mt-3">
					{imagePreview && <AvatarImage src={imagePreview} alt="Avatar" />}
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
					<Label htmlFor="avatar">Upload Photo</Label>
					<Button
						variant="outline"
						onClick={() => {
							if (ref && ref.current) {
								ref.current.click();
							}
						}}
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
								// Set image preview URL
								const reader = new FileReader();
								reader.onloadend = () => {
									setImagePreview(reader.result as string);
								};
								reader.readAsDataURL(file);
								setValue("avatar", file);
							}
						}}
						className="hidden"
					/>
					{errors.avatar && (
						<p className="text-red-500 text-sm">{errors.avatar.message}</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="firstName">First Name</Label>
					<Input id="firstName" placeholder="John" {...register("firstName")} />
					{errors.firstName && (
						<p className="text-red-500 text-sm">{errors.firstName.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="lastName">Last Name</Label>
					<Input id="lastName" placeholder="Doe" {...register("lastName")} />
					{errors.lastName && (
						<p className="text-red-500 text-sm">{errors.lastName.message}</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					placeholder="johndoe@example.com"
					type="email"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone">Phone</Label>
				<Input
					id="phone"
					placeholder="+1 (555) 000-0000"
					type="tel"
					{...register("phone")}
				/>
				{errors.phone && (
					<p className="text-red-500 text-sm">{errors.phone.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="address">Address</Label>
				<Textarea
					id="address"
					placeholder="123 Main St, City, Country"
					{...register("address")}
				/>
				{errors.address && (
					<p className="text-red-500 text-sm">{errors.address.message}</p>
				)}
			</div>

			<Button type="submit">Create Contact</Button>
		</form>
	);
}
