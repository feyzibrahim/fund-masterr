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
import { sidebarContent } from "@/lib/constants";
import { IUser } from "@/types/user-types";
import { useLayoutEffect, useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [data, setData] = useState<{
		user?: IUser;
		navMain: {
			title: string;
			url: string;
			icon: any;
			isActive?: boolean;
			items: { title: string; url: string }[];
		}[];
	} | null>();

	useLayoutEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const session = await getSession();
				if (session) {
					const user = await AxiosRequest.get<IUser>(`/user/${session._id}`);
					const navMain = sidebarContent.find(
						(content) => content.role === user.role
					)?.content;
					if (navMain) {
						setData({
							user: user,
							navMain: navMain,
						});
					}
				}
			} catch (error) {
				setData(null);
			}
		};

		fetchUserDetails();
	}, []);

	if (!data) {
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>Loading...</SidebarHeader>
		</Sidebar>;
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				{data && data.user && <NavUser user={data.user} />}
			</SidebarHeader>
			<SidebarContent>{data && <NavMain items={data.navMain} />}</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
