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
	Bot,
	Command,
	GalleryVerticalEnd,
	Settings2,
	SquareTerminal,
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
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
			],
		},
		{
			title: "Contacts",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "View All",
					url: "/contacts",
				},
				{
					title: "Create",
					url: "/contacts/create",
				},
				{
					title: "Archived",
					url: "/contacts/archived",
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
					url: "/docs",
				},
				{
					title: "Get Started",
					url: "/docs/get-started",
				},
				{
					title: "Tutorials",
					url: "/docs/tutorials",
				},
				{
					title: "Changelog",
					url: "/docs/change-log",
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
					url: "/settings",
				},
				{
					title: "Appearance",
					url: "/settings/appearance",
				},
				{
					title: "Notifications",
					url: "/settings/notifications",
				},
				{
					title: "Privacy",
					url: "/settings/privacy",
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
