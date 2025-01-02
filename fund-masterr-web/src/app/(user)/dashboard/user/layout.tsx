import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Users",
	description: "Users details page",
};

interface UsersLayoutProps {
	children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
	return (
		<div className="container mx-auto space-y-6 p-10 pb-16 md:block">{children}</div>
	);
}
