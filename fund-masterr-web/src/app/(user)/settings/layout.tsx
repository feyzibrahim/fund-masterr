import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Settings",
	description: "Manage your account settings and preferences.",
};

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<div className="container mx-auto space-y-6 p-10 pb-16 md:block">{children}</div>
	);
}
