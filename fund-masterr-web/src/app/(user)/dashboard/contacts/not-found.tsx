import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactNotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<h2 className="text-2xl font-bold mb-4">Contact Not Found</h2>
			<p className="text-gray-600 mb-6">
				Sorry, the contact you&apos;re looking for doesn&apos;t exist or has been
				removed.
			</p>
			<Button asChild>
				<Link href="/contacts">Back to Contacts</Link>
			</Button>
		</div>
	);
}
