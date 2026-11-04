"use client";

import Link from "next/link";
import { navLinks } from "./header";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();
	return (
		<nav className="md:flex items-center gap-3 lg:gap-5">
			{navLinks.map((link) => {
				const isActive =
					pathname === link.href ||
					(link.href === "/studios" && pathname.startsWith("/studios/")) ||
					(link.href === "/studios" && pathname.startsWith("/studio-details/"));

				return (
					<Link
						href={link.href}
						key={link.name}
						className={`text-primary transition-all duration-300 border-primary hover:border hover:bg-white/10 hover:text-white/80 rounded-xl px-2 py-1 ${
							isActive ? "text-white/80 border border-primary/80" : ""
						}`}
					>
						{link.name}
					</Link>
				);
			})}
		</nav>
	);
};

export default Nav;
