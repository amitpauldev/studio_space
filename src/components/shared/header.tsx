import Image from "next/image";
import Link from "next/link";
import AuthenticatedState from "./athenticated-state";
import MobileNav from "./mobile-nav";
import Nav from "./nav";

export const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Studios", href: "/studios" },
	{ name: "How it works", href: "/how-it-works" },
	{ name: "About", href: "/about" },
];

const Header = () => {
	return (
		<header className="sticky top-0 shadow-md py-2 bg-white z-50">
			<div className="flex items-center justify-between max-w-7xl px-4 mx-auto">
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

				{/* login button */}
				<div className="hidden md:flex items-center gap-2 text-sm">
					<Link
						href="/signup"
						className="px-4 py-2 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors duration-300"
					>
						Login
					</Link>

					<Link
						href="/login"
						className="px-3 py-2 bg-primary text-white rounded-xl tracking-tighter hover:bg-primary/80 transition-colors duration-300"
					>
						Register
					</Link>
				</div>

				{/* User Profile */}
				<AuthenticatedState />
			</div>
		</header>
	);
};

export default Header;
