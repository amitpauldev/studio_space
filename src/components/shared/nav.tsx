"use client";

import Link from "next/link";
import { navLinks } from "./header";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();
	return (
		<nav className="md:flex items-center gap-3 lg:gap-5">
			{navLinks.map((link) => (
				<Link
					href={link.href}
					key={link.name}
					className={`text-white/80 hover:border-white/80  rounded-xl px-2 py-1 transition-colors duration-300 ${pathname === link.href ? "text-white/80 border border-white/80" : ""}`}
				>
					{link.name}
				</Link>
			))}
		</nav>
	);
};

export default Nav;
