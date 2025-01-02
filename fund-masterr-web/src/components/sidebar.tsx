"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	AudioWaveform,
	BookOpen,
	Command,
	Contact2,
	GalleryVerticalEnd,
	IndianRupee,
	LayoutDashboard,
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
			title: "Transactions",
			url: "#",
			icon: IndianRupee,
			isActive: true,
			items: [
				{
					title: "All",
					url: "/dashboard/transactions",
				},
				{
					title: "History",
					url: "/dashboard/transactions/history",
				},
				{
					title: "Cancelled",
					url: "/dashboard/transactions/cancelled",
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
					title: "Create",
					url: "/dashboard/contacts/create",
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
