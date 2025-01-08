"use client";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import { URLDatePicker } from "./url-date-picker";

export default function NavbarBreadCrumbs() {
	const pathname = usePathname();
	const pathArray = pathname.split("/").filter((val) => val !== "");
	let path = "";

	return (
		<header className="flex h-16 shrink-0 items-center justify-between px-5 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="w-4 h-4" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						{pathArray.map((name, index) => {
							path += "/" + name;

							if (index === pathArray.length - 1) {
								return (
									<BreadcrumbItem
										className="hidden md:block capitalize"
										key={index}
									>
										<Link href={path}>{name}</Link>
									</BreadcrumbItem>
								);
							}

							return (
								<div key={index} className="flex items-center gap-3">
									<BreadcrumbItem className="hidden md:block capitalize">
										<Link href={path}>{name}</Link>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" />
								</div>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<URLDatePicker />
		</header>
	);
}
