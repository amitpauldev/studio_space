"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserRoundPen } from "lucide-react";
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

type ProfileCardProps = {
	userName: string;
	userEmail: string;
	userImage: string;
};

const fieldLabel =
	"mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/50";
const fieldClass =
	"w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm text-foreground ring-1 ring-white/10 outline-none placeholder:text-foreground/40 transition-[box-shadow] duration-300 focus:ring-primary/60";

const ProfileCard = ({ userName, userEmail, userImage }: ProfileCardProps) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [name, setName] = useState(userName);
	const [imageUrl, setImageUrl] = useState(userImage.startsWith("/") ? "" : userImage);
	const [isSaving, setIsSaving] = useState(false);

	const previewImage = imageUrl.trim() || "/images/default-user.png";

	/* ---------- Edit dialog ---------- */
	const openDialog = () => {
		setName(userName);
		setImageUrl(userImage.startsWith("/") ? "" : userImage);
		setDialogOpen(true);
	};

	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const trimmedName = name.trim();

		if (!trimmedName) {
			toast.error("Name can't be empty");
			return;
		}

		const trimmedImage = imageUrl.trim();
		if (trimmedImage && !/^https?:\/\//.test(trimmedImage)) {
			toast.error("Avatar must be a valid http(s) image URL");
			return;
		}

		setIsSaving(true);

		try {
			const { error } = await authClient.updateUser({
				name: trimmedName,
				// keep the built-in default avatar when the field is cleared
				image: trimmedImage || null,
			});

			if (error) {
				toast.error(error.message ?? "Couldn't update your profile");
				return;
			}

			toast.success("Profile updated successfully", { duration: 4000 });
			setDialogOpen(false);
		} catch {
			toast.error("A network error occurred. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
			<div className="flex items-center gap-4">
				<span className="relative shrink-0">
					<img
						src={userImage}
						alt={`${userName} avatar`}
						className="h-16 w-16 rounded-full bg-white/10 object-cover ring-1 ring-primary/40"
					/>
					<span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-secondary bg-emerald-400" title="Online" />
				</span>

				<div className="min-w-0 flex-1">
					<h2 className="truncate text-lg font-bold text-foreground">
						{userName}
					</h2>
					<p className="truncate text-sm text-muted-foreground">{userEmail}</p>
				</div>

				<button
					type="button"
					onClick={openDialog}
					className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold text-primary transition hover:bg-primary/20"
				>
					<UserRoundPen size={14} /> Edit Profile
				</button>
			</div>

			<div className="mt-4 flex items-center gap-1.5 rounded-xl bg-black/20 px-3 py-2 text-xs ring-1 ring-white/10">
				<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
				<span className="text-muted-foreground">
					Changes made here sync across your tabs instantly.
				</span>
			</div>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-md bg-secondary">
					<DialogHeader>
						<DialogTitle className="text-lg font-bold text-foreground">
							Edit profile
						</DialogTitle>
						<DialogDescription>
							Update how your name and avatar appear across StudioSpace.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSave} className="flex flex-col gap-4">
						{/* Avatar preview */}
						<div className="flex flex-col items-center gap-3">
							<img
								src={previewImage}
								alt="New avatar preview"
								className="h-20 w-20 rounded-full bg-white/10 object-cover ring-1 ring-primary/40"
							/>
							<p className="font-medium">{name || userName}</p>
						</div>

						{/* Name */}
						<div>
							<label htmlFor="profile-name" className={fieldLabel}>
								Full name
							</label>
							<input
								id="profile-name"
								type="text"
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
								className={fieldClass}
							/>
						</div>

						{/* Avatar URL */}
						<div>
							<label htmlFor="profile-image" className={fieldLabel}>
								Avatar image URL
							</label>
							<input
								id="profile-image"
								type="url"
								placeholder="https://example.com/avatar.jpg"
								value={imageUrl}
								onChange={(event) => setImageUrl(event.target.value)}
								className={fieldClass}
							/>
							<p className="mt-1.5 text-[11px] text-muted-foreground">
								Paste an image URL. Clear the field to go back to the default
								avatar.
							</p>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setDialogOpen(false)}
								disabled={isSaving}
								className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSaving}
								className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300 cursor-pointer"
							>
								{isSaving ? "Saving..." : "Save Changes"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default ProfileCard;
