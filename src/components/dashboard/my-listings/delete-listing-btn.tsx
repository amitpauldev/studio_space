"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getTokenFromClient } from "@/lib/getJwtToken";
import { refreshLData } from "@/lib/actions/studio";

const DeleteListingButton = ({
	listingName,
	listingId,
	mobile,
}: {
	listingName: string;
	listingId: string | undefined;
	mobile?: boolean;
}) => {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pending, setPending] = useState(false);

	const handleDelete = async () => {
		setPending(true);
		// JWT Token
		const jwtToken = await getTokenFromClient();

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${listingId}`,
				{
					method: "Delete",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${jwtToken}`,
					},
				},
			);
			if (!res.ok) {
				toast.error("Problem occurred while deleting studio listing");
				return;
			}

			toast.success("Deleted successfully");
			await refreshLData("/my-listings");
		} catch {
			toast.error("Couldn't delete. Please try again.");
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
				className={`${mobile ? "flex h-9 text-sm flex-1 justify-center" : "inline-flex h-8 text-xs px-3"} items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 font-semibold text-red-400 transition hover:bg-red-500/20 cursor-pointer`}
			>
				<Trash2 size={mobile ? 14 : 13} /> Delete
			</button>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="bg-secondary text-white">
					<DialogHeader>
						<DialogTitle>Are you sure to delete {listingName}?</DialogTitle>
						<DialogDescription className="text-white/80">
							This will remove your studio listing permanently.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="bg-secondary/70">
						<Button
							variant="outline"
							onClick={() => setDialogOpen(false)}
							disabled={pending}
							className="border border-primary text-primary bg-white/80 hover:bg-white/50 transition-colors duration-300 cursor-pointer"
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleDelete}
							disabled={pending}
							className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300 cursor-pointer"
						>
							{pending ? "Delete..." : "Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DeleteListingButton;
