import NavbarBreadCrumbs from "@/components/navbar-breadcrumbs";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "./action";

export default async function Layout({ children }: { children: React.ReactNode }) {
	const { user, error } = await getUser();

	if (error || !user) {
		return <div>{error || "Unexpected Error Occurred Please try later."}</div>;
	}

	return (
		<SidebarProvider>
			<AppSidebar user={user} />
			<main className="w-full min-h-screen">
				<NavbarBreadCrumbs />
				{children}
			</main>
		</SidebarProvider>
	);
}
