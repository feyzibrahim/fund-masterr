import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsApple, BsGoogle, BsMeta } from "react-icons/bs";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
	return (
		<div className="login-page grid grid-cols-1 md:grid-cols-2 pt-20 min-h-screen px-5 lg:px-40">
			{/* Left Side - Login Form */}
			<div className="py-5 md:px-20 flex flex-col justify-center gap-5">
				<h1 className="text-2xl font-bold">Login</h1>
				<p className="text-foreground-secondary">
					Login to access your Fund Masterr account
				</p>
				<LoginForm />

				<p className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="text-blue-500">
						Sign Up
					</Link>
				</p>

				{/* Divider */}
				<div className="flex gap-2 items-center">
					<div className="h-[1px] w-full bg-foreground-secondary rounded-full"></div>
					<p className="flex-shrink-0 text-xs">Or login with</p>
					<div className="h-[1px] w-full bg-foreground-secondary rounded-full"></div>
				</div>

				{/* Social Login Buttons */}
				<div className="flex gap-5 items-center">
					<Button variant="outline" size="icon" className="w-full">
						<BsMeta />
					</Button>
					<Button variant="outline" size="icon" className="w-full">
						<BsGoogle />
					</Button>
					<Button variant="outline" size="icon" className="w-full">
						<BsApple />
					</Button>
				</div>
			</div>

			{/* Right Side - Image */}
			<div className="flex items-center justify-center">
				<Image
					src="/login-bg.png"
					alt="Login Background"
					width={416}
					height={616}
				/>
			</div>
		</div>
	);
}
