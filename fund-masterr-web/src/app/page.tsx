import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<main>
			<Navbar />
			<div className="min-h-screen px-5 lg:px-40 py-20 grid md:grid-cols-2 gap-10">
				<div className="flex flex-col justify-center md:w-2/3 space-y-7">
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
		</main>
	);
}
