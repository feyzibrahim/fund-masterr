"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth-utils";
import { AxiosRequest } from "@/lib/axios.instance";
import { IUser } from "@/types/user-types";
import {
	AudioWaveform,
	BookOpen,
	Command,
	Contact2,
	GalleryVerticalEnd,
	Layers2,
	Settings2,
} from "lucide-react";
import { useLayoutEffect, useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [data, setData] = useState<{
		user?: IUser;
		teams: { name: string; logo: any; plan: string }[];
		navMain: {
			title: string;
			url: string;
			icon: any;
			isActive?: boolean;
			items: { title: string; url: string }[];
		}[];
	}>({
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
	});

	useLayoutEffect(() => {
		const fetchUserDetails = async () => {
			const session = await getSession();
			if (session) {
				const user = await AxiosRequest.get<IUser>(`/user/${session._id}`);
				console.log(
					"🚀 ~ file: sidebar.tsx:154 ~ fetchUserDetails ~ user:",
					user
				);
				setData((d) => {
					return { user: user, ...d };
				});
			}
		};

		fetchUserDetails();
	}, []);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>{data.user && <NavUser user={data.user} />}</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
