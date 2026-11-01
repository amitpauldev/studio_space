"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navLinks } from "./header";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
	const pathname = usePathname();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button className={"border border-white bg-primary"}>
						<Menu className="w-6 h-6 cursor-pointer" />
					</Button>
				}
			/>

			<DropdownMenuContent className="w-40">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Click to go</DropdownMenuLabel>

					{navLinks.map((link) => (
						<DropdownMenuItem
							key={link.name}
							render={<Link href={link.href} />}
							className={
								pathname === link.href
									? "bg-primary text-primary-foreground"
									: ""
							}
						>
							{link.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
