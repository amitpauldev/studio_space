"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pending, setPending] = useState(false);

	const handleLogout = async () => {
		setPending(true);
		try {
			await authClient.signOut();
			toast.success("Logged out successfully");
			router.push("/");
		} catch {
			toast.error("Couldn't log out. Please try again.");
		} finally {
			setPending(false);
			setDialogOpen(false);
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setDialogOpen(true)}
				className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
			>
				<LogOutIcon size={15} /> Log Out
			</button>

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
		</>
	);
};

export default LogoutButton;
