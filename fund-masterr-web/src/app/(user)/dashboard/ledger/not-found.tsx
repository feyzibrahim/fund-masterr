import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactNotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<h2 className="text-2xl font-bold mb-4">Session not found</h2>
			<p className="text-gray-600 mb-6">
				Sorry, please login again to see this page
			</p>
			<Button asChild>
				<Link href="/">Back to Home</Link>
			</Button>
		</div>
	);
}
