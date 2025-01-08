"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SearchContactForm } from "../../components/search-agent-form";
import { CreateContactForm } from "../../components/create-contact-form";

export function AddNewPayerModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Add New Payer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Payers</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="search" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="search">Search Payer</TabsTrigger>
						<TabsTrigger value="create">Create Payer</TabsTrigger>
					</TabsList>
					<TabsContent value="search">
						<SearchContactForm />
					</TabsContent>
					<TabsContent value="create">
						<CreateContactForm setIsOpen={setIsOpen} type="payer" />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
