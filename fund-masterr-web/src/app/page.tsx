import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CloudCog } from "lucide-react";
import Image from "next/image";

export default function Home() {
	return (
		<main className="px-5 lg:px-40">
			<Navbar />
			<div className="min-h-screen py-20 grid md:grid-cols-2">
				<div className="flex flex-col justify-center space-y-7 bg-gray-200 px-20">
					<p>
						<span className="text-4xl">*</span>30 Days free trial
					</p>
					<h1 className="text-5xl font-black">Life Should Be Easy</h1>
					<p className="text-foreground-secondary">
						Financial Transactions, Tracking, and Accounting Made Easy
					</p>
					<Button className="w-fit px-10 py-6">Get Started</Button>
				</div>
				<div>
					<Image src="/home-bg.png" alt="home-bg" width={558} height={659} />
				</div>
			</div>
			<div className="space-y-5 text-center min-h-screen flex flex-col items-center justify-center">
				<div className="space-y-5">
					<h1 className="text-3xl font-black">How it works</h1>
					<p>
						Mobile Banking differs from mobile payments, which involves the
						use of a mobile device
					</p>
				</div>
				<div className="grid  md:grid-cols-3 gap-10">
					<div className="space-y-5 border p-5 rounded-3xl">
						<div className="shadow-xl h-40 rounded-3xl flex flex-col justify-center gap-5 p-5">
							<div className="bg-gray-200 h-5 w-3/4 rounded-full"></div>
							<div className="bg-gray-200 h-5 rounded-full"></div>
							<div className="bg-gray-200 h-5 w-3/4 rounded-full"></div>
							<div className="bg-gray-200 h-5 w-2/4 rounded-full"></div>
						</div>
						<div className="h-20 bg-blue-500 rounded-3xl flex gap-5 items-center p-5">
							<div className="p-3 bg-pink-500 w-fit rounded-xl h-fit">
								<CloudCog />
							</div>
							<div className="w-full bg-white h-3 rounded-full"></div>
						</div>
						<h2 className="text-xl font-bold">Information</h2>
						<p>
							Enter your information ensure you details safe and more
							secure.
						</p>
					</div>
					<div className="space-y-5 border p-5 rounded-3xl">
						<div className="shadow-xl h-64 rounded-3xl flex items-end gap-5 p-10">
							<div className="bg-blue-500 h-28 w-full"></div>
							<div className="bg-blue-500 h-20 w-full"></div>
							<div className="bg-blue-500 h-48 w-full"></div>
							<div className="bg-blue-500 h-36 w-full"></div>
							<div className="bg-blue-500 h-16 w-full"></div>
						</div>
						<h2 className="text-xl font-bold">Data Secure</h2>
						<p>Sending money faster & easier with end to end encryption</p>
					</div>
					<div className="space-y-5 border p-5 rounded-3xl">
						<h2 className="text-xl font-bold">Add Cards</h2>
						<p>
							Add multiple cards and track your daily expense with quality
							interface
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
