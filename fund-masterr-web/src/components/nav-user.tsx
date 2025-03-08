"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/auth-utils";
import { IUser } from "@/types/user-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavUser({ user }: { user: IUser }) {
	const pathname = usePathname();
	const { isMobile } = useSidebar();

	const handleLogout = async () => {
		await logout();
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg sidebar-primary">
								<AvatarImage
									src={user.profileImgURL}
									alt={`${user.firstName} ${user.lastName}`}
								/>
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{user.firstName ?? "Name not added"}{" "}
									{user.lastName ?? ""}
								</span>
								<span className="truncate text-xs">
									{user.phoneNumber ? user.phoneNumber : user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg sidebar-primary">
									<AvatarImage
										src={user.profileImgURL}
										alt={`${user.firstName} ${user.lastName}`}
									/>
									<AvatarFallback className="rounded-lg">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{user.firstName ?? "Name not added"}{" "}
										{user.lastName ?? ""}
									</span>
									<span className="truncate text-xs">
										{user.phoneNumber ? user.phoneNumber : user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="flex items-center gap-3">
								<Sparkles className="w-4 h-4" />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className={`${
									pathname === "/dashboard/settings"
										? "bg-muted hover:bg-muted"
										: "hover:bg-transparent hover:underline"
								}`}
							>
								<Link
									href="/dashboard/settings"
									className={`flex items-center gap-3`}
								>
									<BadgeCheck className="w-4 h-4" />
									Account
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className={`${
									pathname === "/dashboard/settings/billing"
										? "bg-muted hover:bg-muted"
										: "hover:bg-transparent hover:underline"
								}`}
							>
								<Link
									href="/dashboard/settings/billing"
									className={`flex items-center gap-3`}
								>
									<CreditCard className="w-4 h-4" />
									Billing
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className={`${
									pathname === "/dashboard/settings/notifications"
										? "bg-muted hover:bg-muted"
										: "hover:bg-transparent hover:underline"
								}`}
							>
								<Link
									href="/dashboard/settings/notifications"
									className={`flex items-center gap-3`}
								>
									<Bell className="w-4 h-4" />
									Notifications
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="flex items-center gap-3"
							onClick={handleLogout}
						>
							<LogOut className="w-4 h-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
