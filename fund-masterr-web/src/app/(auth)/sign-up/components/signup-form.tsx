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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "../signup";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Define schema using Zod
export const SignupSchema = z.object({
	email: z.string().optional(),
	phoneNumber: z.string().optional(),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignupForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: SignupFormValues) {
		setIsLoading(true);
		setError(null);

		const result = await signup(values);

		if (result.success) {
			router.push("/dashboard");
		} else {
			setError(result.error || "An error occurred during Signup");
		}

		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
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
								<Input placeholder="Enter your phone number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password Field */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										{...field}
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<AiOutlineEyeInvisible />
										) : (
											<AiOutlineEye />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Enter your password again"
										{...field}
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
										onClick={() =>
											setShowConfirmPassword(!showConfirmPassword)
										}
									>
										{showConfirmPassword ? (
											<AiOutlineEyeInvisible />
										) : (
											<AiOutlineEye />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{error && <p className="text-red-500 text-sm">{error}</p>}

				{/* Submit Button */}
				<Button type="submit" className="w-full">
					{isLoading ? "Signing up..." : "Signup"}
				</Button>
			</form>
		</Form>
	);
}
