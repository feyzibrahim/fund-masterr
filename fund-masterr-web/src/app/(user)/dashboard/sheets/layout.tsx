import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sheets",
	description: "Manage your sheets here.",
};

interface SheetsLayoutProps {
	children: React.ReactNode;
}

export default function SheetsLayout({ children }: SheetsLayoutProps) {
	return (
		<div className="container mx-auto space-y-6 p-10 pb-16 md:block">{children}</div>
	);
}
