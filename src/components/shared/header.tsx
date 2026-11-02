import Image from "next/image";
import Link from "next/link";
import AuthenticatedState from "./athenticated-state";
import MobileNav from "./mobile-nav";
import Nav from "./nav";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

export const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Studios", href: "/studios" },
	{ name: "How it works", href: "/how-it-works" },
	{ name: "About", href: "/about" },
];

const Header = () => {
	return (
		<header className="sticky top-0 py-2 border-b border-white/10 bg-black/60 backdrop-blur-sm z-50">
			<div className="flex items-center justify-between max-w-7xl px-4 mx-auto z-10">
				<div className="flex items-center gap-1">
					<div className="md:hidden">
						<MobileNav />
					</div>
					{/* Logo */}
					<Link href="/">
						<div className="w-40 md:w-50">
							<Image
								src="/images/logo.png"
								alt="Logo"
								width={100}
								height={60}
							/>
						</div>
					</Link>
				</div>

				{/* nav */}
				<div className="hidden md:block">
					<Nav />
				</div>

				<Suspense
					fallback={
						<div className="animate-spin w-8 h-8">
							<LoaderIcon />
						</div>
					}
				>
					<AuthenticatedState />
				</Suspense>
			</div>
		</header>
	);
};

export default Header;
