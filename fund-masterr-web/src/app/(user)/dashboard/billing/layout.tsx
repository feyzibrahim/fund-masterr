import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contacts",
	description: "Read all about the contacts",
};

interface ContactsLayoutProps {
	children: React.ReactNode;
}

export default function ContactsLayout({ children }: ContactsLayoutProps) {
	return <div className="container mx-auto px-5 md:block">{children}</div>;
}
