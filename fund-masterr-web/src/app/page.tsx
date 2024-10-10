import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudCog, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiLogoPlayStore } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function Home() {
	return (
		<main className="px-5 lg:px-40">
			<Navbar />
			<div className="min-h-screen py-20 grid md:grid-cols-2">
				<div className="flex flex-col justify-center space-y-7 bg-background-secondary md:px-20">
					<p>
						<span className="text-4xl">*</span>30 Days free trial
					</p>
					<h1 className="text-2xl md:text-6xl font-black">
						Life Should Be Easy
					</h1>
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
							<div className="bg-background-secondary h-5 w-3/4 rounded-full"></div>
							<div className="bg-background-secondary h-5 rounded-full"></div>
							<div className="bg-background-secondary h-5 w-3/4 rounded-full"></div>
							<div className="bg-background-secondary h-5 w-2/4 rounded-full"></div>
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
						<div className="shadow-2xl h-64 rounded-3xl flex items-end gap-5 p-10">
							<div className="bg-blue-500 h-28 w-full rounded-md"></div>
							<div className="bg-blue-500 h-20 w-full rounded-md"></div>
							<div className="bg-blue-500 h-48 w-full rounded-md"></div>
							<div className="bg-blue-500 h-36 w-full rounded-md"></div>
							<div className="bg-blue-500 h-16 w-full rounded-md"></div>
						</div>
						<h2 className="text-xl font-bold">Data Secure</h2>
						<p>Keeping accounts faster & easier with end to end encryption</p>
					</div>
					<div className="space-y-5 border p-5 rounded-3xl">
						<div className="h-64 shadow-2xl rounded-3xl overflow-clip">
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>John Doe</p>
							</div>
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>Stephan Strange</p>
							</div>
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>Capitan Miller</p>
							</div>
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>Helen Rude</p>
							</div>
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>Rudy</p>
							</div>
							<div className="flex items-center gap-5 p-4 border-b">
								<User />
								<p>John Doe</p>
							</div>
						</div>
						<h2 className="text-xl font-bold">Add Multiple Contact</h2>
						<p>
							Add multiple contacts and track your daily expense with
							quality interface
						</p>
					</div>
				</div>
			</div>
			<div className="min-h-screen grid md:grid-cols-2">
				<div className="flex items-center justify-center">
					<Image
						src="/mobile1.png"
						alt="mobile1"
						width={750}
						height={946}
						className="md:w-2/3"
					/>
				</div>
				<div className="md:p-20 flex flex-col justify-center space-y-10">
					<h1 className="text-2xl md:text-6xl font-black">
						Download mobile app
					</h1>
					<p>
						Download our mobile transaction app for android. It helps your
						transaction quickly and more smartly.
					</p>
					<div>
						<div className="border rounded-3xl flex gap-3 p-5 items-center w-fit font-bold hover:text-blue-500 cursor-pointer">
							<BiLogoPlayStore className="h-7 w-7" />
							Play Store
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-screen grid md:grid-cols-2 border-b">
				<div className="md:p-20 flex flex-col justify-center space-y-10">
					<h1 className="text-2xl md:text-6xl font-black">
						Connecting all your contacts
					</h1>
					<p>
						All your contacts are connected with our app. You can easily track
						your daily expense with our app.
					</p>
					<div>
						<div className="border rounded-3xl flex gap-3 py-5 px-10 items-center w-fit font-bold hover:text-blue-500 cursor-pointer">
							Get Started
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<Image
						src="/mobile2.png"
						alt="mobile1"
						width={652}
						height={946}
						className="w-2/3"
					/>
				</div>
			</div>
			<div className="flex items-center justify-center h-96 text-center">
				<div className="space-y-5">
					<h1 className="text-4xl font-bold">Subscribe Newsletter</h1>
					<p>Get the latest updates and offers from us.</p>

					<div className="md:flex space-y-5 md:space-y-0 gap-5">
						<Input
							type="email"
							placeholder="Enter your email."
							className="px-7 py-7"
						/>
						<Button className="px-7 py-7 w-full md:w-fit">Get Started</Button>
					</div>
				</div>
			</div>
			<footer className="bg-background-secondary px-10 py-8 text-sm">
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* About Section */}
					<div className="space-y-5">
						<Link href="/">
							<div className="flex gap-2 items-center hover:cursor-pointer">
								<Image
									src="/logo.png"
									alt="logo"
									width={30}
									height={30}
								/>
								<p className="font-bold">Fund Masterr</p>
							</div>
						</Link>
						<p>
							Financial transactions remotely using a mobile device such as
							a smartphone, laptop or tablet.
						</p>
						<div className="space-x-4 flex">
							<Link
								target="_blank"
								href=""
								className="hover:text-primary bg-background-secondary-darker p-2 rounded-md"
							>
								<FaFacebook className="w-3 h-3" />
							</Link>
							<Link
								target="_blank"
								href="#"
								className="hover:text-primary bg-background-secondary-darker p-2 rounded-md"
							>
								<BsTwitter className="w-3 h-3" />
							</Link>
							<Link
								target="_blank"
								href=""
								className="hover:text-primary bg-background-secondary-darker p-2 rounded-md"
							>
								<BsInstagram className="w-3 h-3" />
							</Link>
						</div>
					</div>

					{/* Quick Links Section */}
					<div>
						<h2 className="font-black mb-4">Related</h2>
						<ul className="space-y-2">
							<li>
								<Link href="" className=" hover:text-primary">
									About
								</Link>
							</li>
							<li>
								<Link href="#about" className=" hover:text-primary">
									Terms of Use
								</Link>
							</li>
							<li>
								<Link href="#experience" className=" hover:text-primary">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="#contact-us" className=" hover:text-primary">
									How it works
								</Link>
							</li>
							<li>
								<Link href="#contact-us" className=" hover:text-primary">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="font-black mb-4">Support</h2>
						<div className="space-y-2">
							<p className="">Support Career</p>
							<p className="">24h Service</p>
							<p className="">Quick Chat</p>
						</div>
					</div>
					<div>
						<h2 className="font-black mb-4">Contact</h2>
						<div className="space-y-2">
							<p className="">Email: contact@fundmasterr.com</p>
							<p className="">Phone: +91 00000 00000</p>
						</div>
					</div>
				</div>

				<div className="border-t border-background mt-8 pt-4">
					<p className="text-center text-foreground-secondary">
						© 2024 Fund Masterr. All rights reserved.
					</p>
				</div>
			</footer>
		</main>
	);
}
