"use client";

import Link from "next/link";
import { navLinks } from "./header";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();
	return (
		<nav className="md:flex items-center gap-4 lg:gap-6">
			{navLinks.map((link) => (
				<Link
					href={link.href}
					key={link.name}
					className={`text-muted-foreground hover:text-primary transition-colors duration-300 ${pathname === link.href ? "text-primary" : ""}`}
				>
					{link.name}
				</Link>
			))}
		</nav>
	);
};

export default Nav;
