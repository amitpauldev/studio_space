"use client";

import {
	Bookmark,
	ChevronDown,
	DatabasePlus,
	FolderCog,
	LayoutGridCircles,
	LogOutIcon,
	User,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthenticatedState() {
	const pathname = usePathname();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				nativeButton={false}
				render={
					<div className="flex items-center gap-.5 cursor-pointer">
						<span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
							<span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
								<User />
							</span>
						</span>
						<div className="hidden sm:flex flex-col text-sm">
							<span className="ml-2">User Name</span>
							<span className="ml-2 text-[12px] text-muted-foreground">
								user123@gmail.com
							</span>
						</div>
						<ChevronDown className="w-5 sm:self-end ml-2" />
					</div>
				}
			/>

			<DropdownMenuContent className="text-nowrap w-45">
				<DropdownMenuItem>
					<div className="flex sm:hidden flex-col text-sm">
						<span className="ml-2">User Name</span>
						<span className="ml-2 text-[12px] text-muted-foreground">
							user123@gmail.com
						</span>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					render={<Link href="/dashboard" />}
					className={
						pathname === "/dashboard"
							? "bg-primary text-primary-foreground cursor-pointer"
							: "cursor-pointer"
					}
				>
					<LayoutGridCircles />
					Dashboard
				</DropdownMenuItem>

				<DropdownMenuItem
					render={<Link href="/add-new-studio" />}
					className={
						pathname === "/add-new-studio"
							? "bg-primary text-primary-foreground cursor-pointer"
							: "cursor-pointer"
					}
				>
					<DatabasePlus />
					Add New Studio
				</DropdownMenuItem>

				<DropdownMenuItem
					render={<Link href="/my-studio-listings" />}
					className={
						pathname === "/my-studio-listings"
							? "bg-primary text-primary-foreground cursor-pointer"
							: "cursor-pointer"
					}
				>
					<FolderCog />
					My Studio Listings
				</DropdownMenuItem>

				<DropdownMenuItem
					render={<Link href="/my-bookings" />}
					className={
						pathname === "/my-bookings"
							? "bg-primary text-primary-foreground cursor-pointer"
							: "cursor-pointer"
					}
				>
					<Bookmark />
					My Bookings
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem variant="destructive" className="cursor-pointer">
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
