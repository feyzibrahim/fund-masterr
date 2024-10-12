import Navbar from "@/components/navbar";

interface Props {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
