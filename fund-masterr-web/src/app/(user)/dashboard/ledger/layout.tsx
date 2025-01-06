import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Ledger",
	description: "Manage your ledger here.",
};

interface LedgerLayoutProps {
	children: React.ReactNode;
}

export default function LedgerLayout({ children }: LedgerLayoutProps) {
	return (
		<div className="container mx-auto space-y-6 p-10 pb-16 md:block">{children}</div>
	);
}
