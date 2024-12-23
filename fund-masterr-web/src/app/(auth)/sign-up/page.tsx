import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { BsApple, BsGoogle, BsMeta } from "react-icons/bs";

export default function SignUpPage() {
	return (
		<div className="login-page grid grid-cols-1 md:grid-cols-2 pt-20 min-h-screen px-5 lg:px-40">
			<div className="py-5 md:px-10 flex flex-col justify-center gap-5 ">
				<h1 className="text-2xl font-bold">Sign Up</h1>
				<p className="text-foreground-secondary">
					Let&apos;s get you all set up so you can access your personal account.
				</p>
				<Input placeholder="Enter your email" />
				<Input placeholder="Enter your password" />
				<Button className="w-full">Submit</Button>
				<p className="text-center text-sm">
					Already have an account?{" "}
					<Link href="/sign-up" className="text-blue-500">
						Login
					</Link>
				</p>
				<div className="flex gap-2 items-center">
					<div className="h-[1px] w-full bg-foreground-secondary rounded-full"></div>
					<p className="flex-shrink-0 text-xs">Or login with</p>
					<div className="h-[1px] w-full bg-foreground-secondary rounded-full"></div>
				</div>
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
			<div className="flex items-center justify-center ">
				<Image src="/sign-up-bg.png" alt="mobile1" width={287} height={416} />
			</div>
		</div>
	);
}
