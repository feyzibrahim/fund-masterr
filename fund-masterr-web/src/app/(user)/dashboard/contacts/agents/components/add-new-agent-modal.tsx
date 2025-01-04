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
import { SearchAgentForm } from "./search-agent-form";
import { CreateAgentForm } from "./create-agent-form";

export function AddNewAgentModal() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Add New Agents</Button>
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
						<SearchAgentForm />
					</TabsContent>
					<TabsContent value="create">
						<CreateAgentForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
