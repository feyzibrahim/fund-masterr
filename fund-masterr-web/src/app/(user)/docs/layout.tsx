import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Documentation",
	description: "Read all about the Fund-Masterr",
};

interface DocsLayoutProps {
	children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
	return <div className="container mx-auto p-10 md:block">{children}</div>;
}
