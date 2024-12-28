import NavbarBreadCrumbs from "@/components/navbar-breadcrumbs";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full min-h-screen">
				<NavbarBreadCrumbs />
				{children}
			</main>
		</SidebarProvider>
	);
}
