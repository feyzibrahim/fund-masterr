import { BookOpen, Contact2, Layers2, Settings2 } from "lucide-react";

export const redirectUrls = [
	{
		role: "super-admin",
		defaultUrl: "/admin-dashboard",
		allowedUrls: ["/admin-dashboard"],
	},
	{
		role: "payer",
		defaultUrl: "/dashboard",
		allowedUrls: ["/dashboard"],
	},
	{
		role: "agent",
		defaultUrl: "/dashboard",
		allowedUrls: ["/dashboard"],
	},
];

export const sidebarContent = [
	{
		role: "payer",
		content: [
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
						title: "Billing",
						url: "/dashboard/billing",
					},
					{
						title: "Appearance",
						url: "/dashboard/settings/appearance",
					},
					{
						title: "Notifications",
						url: "/dashboard/settings/notifications",
					},
				],
			},
		],
	},
	{
		role: "agent",
		content: [
			{
				title: "Sheets",
				url: "",
				icon: Layers2,
				isActive: true,
				items: [
					{
						title: "All",
						url: "/dashboard/sheets",
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
	},
];
