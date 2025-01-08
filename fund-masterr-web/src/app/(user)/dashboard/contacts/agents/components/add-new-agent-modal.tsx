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
import { CreateContactForm } from "../../components/create-contact-form";
import { SearchContactForm } from "../../components/search-agent-form";

export function AddNewAgentModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Add New Agents</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Agents</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="search" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="search">Search Agent</TabsTrigger>
						<TabsTrigger value="create">Create Agent</TabsTrigger>
					</TabsList>
					<TabsContent value="search">
						<SearchContactForm />
					</TabsContent>
					<TabsContent value="create">
						<CreateContactForm setIsOpen={setIsOpen} type="agent" />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
