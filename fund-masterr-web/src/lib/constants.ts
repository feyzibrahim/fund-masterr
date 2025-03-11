import { BookOpen, BookText, Contact2, Layers2, Settings2 } from "lucide-react";

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
				url: "/dashboard/ledger",
				icon: BookText,
				isActive: true,
				items: [
					{
						title: "All",
						url: "/dashboard/ledger",
					},
					{
						title: "Payers",
						url: "/dashboard/ledger/payer",
					},
					{
						title: "Agents",
						url: "/dashboard/ledger/agent",
					},
				],
			},
			{
				title: "Sheets",
				url: "/dashboard/sheets",
				icon: Layers2,
				isActive: true,
				items: [
					{
						title: "All",
						url: "/dashboard/sheets",
					},
					{
						title: "Delivered",
						url: "/dashboard/sheets/delivered",
					},
					{
						title: "Pending",
						url: "/dashboard/sheets/pending",
					},
					{
						title: "Cancelled",
						url: "/dashboard/sheets/cancelled",
					},
				],
			},
			{
				title: "Contacts",
				url: "/dashboard/contacts",
				icon: Contact2,
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
				url: "/dashboard/docs",
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
				url: "/dashboard/settings",
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
				url: "/dashboard/sheets",
				icon: Layers2,
				isActive: true,
				items: [
					{
						title: "All",
						url: "/dashboard/sheets",
					},
					{
						title: "Delivered",
						url: "/dashboard/sheets/delivered",
					},
					{
						title: "Pending",
						url: "/dashboard/sheets/pending",
					},
					{
						title: "Cancelled",
						url: "/dashboard/sheets/cancelled",
					},
				],
			},
			{
				title: "Settings",
				url: "/dashboard/settings",
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
