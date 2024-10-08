"use client";

import { useState, useEffect } from "react";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-switch";

export default function Navbar() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > lastScrollY) {
				// Scroll Down
				setIsVisible(false);
			} else {
				// Scroll Up
				setIsVisible(true);
			}
			setLastScrollY(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);

			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY]);

	return (
		<nav
			className={`w-full px-5 lg:px-40 py-5 flex items-center justify-between fixed top-0 left-0 transition-transform duration-300 bg-background shadow-md z-50 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<Link href="/">
				<div className="flex gap-2 items-center hover:cursor-pointer">
					<Image src="/logo.png" alt="logo" width={30} height={30} />
					<p className="font-bold">Fund Masterr</p>
				</div>
			</Link>
			<div className="hidden lg:flex gap-5 text-sm">
				<p className="text-foreground-secondary cursor-pointer hover:text-foreground">
					<Link href="#business">Business</Link>
				</p>
				<p className="text-foreground-secondary cursor-pointer hover:text-foreground">
					<Link href="#pricing">Pricing</Link>
				</p>
				<p className="text-foreground-secondary cursor-pointer hover:text-foreground">
					<Link href="#features">Features</Link>
				</p>
				<p className="text-foreground-secondary cursor-pointer hover:text-foreground">
					<Link href="#about">About</Link>
				</p>
			</div>
			<div className="space-x-5 hidden md:block">
				<Button variant="link">Login</Button>
				<Button>Sign Up</Button>
				<ModeToggle />
			</div>
			<div className="lg:hidden">
				<AlignJustify />
			</div>
		</nav>
	);
}
