"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarContent } from "@/lib/constants";
import { IUser } from "@/types/user-types";

export function AppSidebar({
	user,
	...props
}: React.ComponentProps<typeof Sidebar> & { user: IUser }) {
	const navMain = sidebarContent.find((content) => content.role === user.role)?.content;

	if (!navMain) {
		return null;
	}

	const data = { user: user, navMain: navMain };

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
