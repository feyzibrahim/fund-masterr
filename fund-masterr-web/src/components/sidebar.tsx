"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	AudioWaveform,
	BookOpen,
	Command,
	Contact2,
	GalleryVerticalEnd,
	IndianRupee,
	Layers2,
	Settings2,
} from "lucide-react";
import * as React from "react";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Ledger",
			url: "#",
			icon: Layers2,
			isActive: true,
			items: [
				{
					title: "All",
					url: "/dashboard/ledger",
				},
				{
					title: "Sheets",
					url: "/dashboard/ledger/sheets",
				},
				{
					title: "Cancelled",
					url: "/dashboard/ledger/cancelled",
				},
			],
		},
		{
			title: "Contacts",
			url: "#",
			icon: Contact2,
			isActive: true,
			items: [
				{
					title: "All",
					url: "/dashboard/contacts",
				},
				{
					title: "Payers",
					url: "/dashboard/contacts/payers",
				},
				{
					title: "Agents",
					url: "/dashboard/contacts/agents",
				},
				{
					title: "Archived",
					url: "/dashboard/contacts/archived",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "/dashboard/docs",
				},
				{
					title: "Get Started",
					url: "/dashboard/docs/get-started",
				},
				{
					title: "Tutorials",
					url: "/dashboard/docs/tutorials",
				},
				{
					title: "Changelog",
					url: "/dashboard/docs/change-log",
				},
			],
		},
		{
			title: "Settings",
			url: "",
			icon: Settings2,
			items: [
				{
					title: "Account",
					url: "/dashboard/settings",
				},
				{
					title: "Appearance",
					url: "/dashboard/settings/appearance",
				},
				{
					title: "Notifications",
					url: "/dashboard/settings/notifications",
				},
				{
					title: "Privacy",
					url: "/dashboard/settings/privacy",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<NavUser user={data.user} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
