"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SearchAgentForm() {
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement search functionality
		console.log("Searching for agent with phone number:", phoneNumber);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="phone-number">Phone Number</Label>
				<Input
					id="phone-number"
					type="tel"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					required
				/>
			</div>
			<Button type="submit" className="w-full">
				Search
			</Button>
		</form>
	);
}
