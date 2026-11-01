"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioMenuLinks } from "@/lib/studios-data";

const StudiosMenu = () => {
	const pathname = usePathname();

	return (
		<nav
			aria-label="Studios menu"
			className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
		>
			{studioMenuLinks.map((link) => {
				const active = pathname === link.href;
				const Icon = link.icon;

				return (
					<Link
						key={link.href}
						href={link.href}
						aria-current={active ? "page" : undefined}
						className={`flex items-center gap-3 shrink-0 lg:shrink rounded-xl px-4 py-3 text-sm font-medium ring-1 transition-all duration-300 ${
							active
								? "bg-primary text-primary-foreground ring-primary shadow-lg shadow-primary/20"
								: "bg-white/5 text-foreground ring-white/10 hover:bg-white/10 hover:ring-primary/50"
						}`}
					>
						<Icon size={18} strokeWidth={1.8} className="shrink-0" />
						<span className="whitespace-nowrap">{link.name}</span>
						<span
							className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
								active
									? "bg-primary-foreground/20 text-primary-foreground"
									: "bg-white/10 text-foreground/70"
							}`}
						>
							{link.count}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default StudiosMenu;
