"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend API
		console.log("Form submitted:", formData);
		// Reset form after submission
		setFormData({ name: "", email: "", phone: "", address: "" });
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Contact</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							name="phone"
							type="tel"
							value={formData.phone}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							name="address"
							value={formData.address}
							onChange={handleChange}
						/>
					</div>
					<Button type="submit">Create Contact</Button>
				</form>
			</CardContent>
		</Card>
	);
}
