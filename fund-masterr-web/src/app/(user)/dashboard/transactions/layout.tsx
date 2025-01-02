import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Transactions",
	description: "Manage your account transactions here.",
};

interface TransactionsLayoutProps {
	children: React.ReactNode;
}

export default function TransactionsLayout({ children }: TransactionsLayoutProps) {
	return (
		<div className="container mx-auto space-y-6 p-10 pb-16 md:block">{children}</div>
	);
}
