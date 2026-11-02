"use client";

import {
	Bookmark,
	ChevronDown,
	DatabasePlus,
	FolderCog,
	LayoutGridCircles,
	LogOutIcon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function AuthenticatedState() {
	const pathname = usePathname();
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pending, setPending] = useState(false);

	const { data: session } = authClient.useSession();
	const user = session?.user;
	const userName = user?.name || "User Name";
	const userEmail = user?.email || "user@gmail.com";
	const userImage = user?.image || "/images/default-user.png";

	async function handleLogout() {
		setPending(true);
		try {
			await authClient.signOut();
			toast.success("Logged out successfully");
			router.push("/");
		} finally {
			setPending(false);
			setDialogOpen(false);
		}
	}

	return (
		<>
			{user ? (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger
							nativeButton={false}
							render={
								<div className="flex items-center gap-.5 cursor-pointer">
									<span className="w-10 h-10 rounded-full bg-primary/60 backdrop-blur-sm flex items-center justify-center">
										<span className="w-8 h-8 rounded-full bg-secondary/60 backdrop-blur-sm flex items-center justify-center">
											<Image
												src={userImage}
												alt="User Avatar"
												width={32}
												height={32}
												className="rounded-full"
											/>
										</span>
									</span>
									<div className="hidden sm:flex flex-col text-sm">
										<span className="ml-2">{userName}</span>
										<span className="ml-2 text-[12px] text-white/80">
											{userEmail}
										</span>
									</div>
									<ChevronDown className="ml-2 sm:hidden" size={16} />
								</div>
							}
						/>

						<DropdownMenuContent className="text-nowrap w-45 bg-secondary/60 backdrop-blur-sm text-white">
							<DropdownMenuItem>
								<div className="flex sm:hidden flex-col text-sm">
									<span className="ml-2">{userName}</span>
									<span className="ml-2 text-[12px] text-white/80">
										{userEmail}
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
								render={<Link href="/my-listings" />}
								className={
									pathname === "/my-listings"
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

							<DropdownMenuItem
								variant="destructive"
								className="cursor-pointer"
								onClick={() => setDialogOpen(true)}
							>
								<LogOutIcon />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogContent className="bg-secondary text-white">
							<DialogHeader>
								<DialogTitle>Log out of StudioSpace?</DialogTitle>
								<DialogDescription className="text-white/80">
									You can log back in anytime with your account.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="bg-secondary/70">
								<Button
									variant="outline"
									onClick={() => setDialogOpen(false)}
									disabled={pending}
									className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={handleLogout}
									disabled={pending}
									className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300 cursor-pointer"
								>
									{pending ? "Logging out..." : "Log out"}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			) : (
				<div className="flex items-center gap-2 text-sm">
					<Link
						href="/login"
						className="px-4 py-2 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors duration-300"
					>
						Login
					</Link>

					<Link
						href="/register"
						className="px-3 py-2 bg-primary text-white rounded-xl tracking-tighter hover:bg-primary/80 transition-colors duration-300"
					>
						Register
					</Link>
				</div>
			)}
		</>
	);
}
