"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
	Camera,
	Clapperboard,
	DollarSign,
	BadgeDollarSign,
	Users,
	MapPin,
	ImageIcon,
	FileText,
	Plus,
	X,
	Lock,
	User,
	Mail,
	Sparkles,
	LayoutGridCircles,
	Info,
	Mic,
	Music4,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { revalidateStudioPaths } from "@/lib/actions/studio";
import { getTokenFromClient } from "@/lib/getJwtToken";

const categories = [
	{ value: "photo-studio", label: "Photo Studio", icon: Camera },
	{ value: "film-stage", label: "Film Stage", icon: Clapperboard },
	{ value: "podcast-lounge", label: "Podcast Lounge", icon: Mic },
	{ value: "music-suite", label: "Music Suite", icon: Music4 },
	{ value: "workshop", label: "Workshop", icon: Sparkles },
] as const;

const amenityOptions = [
	"4K Camera",
	"Studio Lighting",
	"Green Screen",
	"Soundproofing",
	"Microphones",
	"Mixing Console",
	"Piano / Keyboard",
	"Truss & Backdrops",
	"High-Speed Wi-Fi",
	"Air Conditioning",
	"Free Parking",
	"Green Room",
	"Kitchenette",
	"Whiteboard",
] as const;

type FormValues = {
	title: string;
	category: string;
	hourlyRate: string;
	securityDeposit: string;
	maxCapacity: string;
	location: string;
	imageUrl: string;
	overview: string;
};

const initialFormValues: FormValues = {
	title: "",
	category: "",
	hourlyRate: "",
	securityDeposit: "",
	maxCapacity: "",
	location: "",
	imageUrl: "",
	overview: "",
};

const AddNewStudio = () => {
	const [values, setValues] = useState<FormValues>(initialFormValues);
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const [customAmenity, setCustomAmenity] = useState("");
	const [errors, setErrors] = useState<
		Partial<Record<keyof FormValues | "amenities", string>>
	>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: session } = authClient.useSession();
	const user = session?.user;
	const userName = user?.name || "User Name";
	const userEmail = user?.email || "user@gmail.com";

	const inputClass =
		"h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20";

	const updateField = (field: keyof FormValues, value: string) => {
		setValues((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	};

	const toggleAmenity = (amenity: string) => {
		setSelectedAmenities((prev) =>
			prev.includes(amenity)
				? prev.filter((item) => item !== amenity)
				: [...prev, amenity],
		);
		setErrors((prev) => ({ ...prev, amenities: "" }));
	};

	const addCustomAmenity = () => {
		const amenity = customAmenity.trim();
		if (!amenity) return;
		if (amenity.length > 30) {
			toast.error("Amenity name is too long (max 30 characters)");
			return;
		}
		if (!selectedAmenities.includes(amenity)) {
			setSelectedAmenities((prev) => [...prev, amenity]);
		}
		setCustomAmenity("");
	};

	const validate = () => {
		const nextErrors: typeof errors = {};
		if (values.title.trim().length < 4) {
			nextErrors.title = "Title must be at least 4 characters long.";
		}
		if (!values.category) {
			nextErrors.category = "Please select a category.";
		}
		if (!values.hourlyRate || Number(values.hourlyRate) <= 0) {
			nextErrors.hourlyRate = "Enter a valid hourly rate greater than 0.";
		}
		if (values.securityDeposit && Number(values.securityDeposit) < 0) {
			nextErrors.securityDeposit = "Deposit cannot be negative.";
		}
		if (!values.maxCapacity || Number(values.maxCapacity) <= 0) {
			nextErrors.maxCapacity = "Enter a valid maximum capacity.";
		}
		if (values.location.trim().length < 6) {
			nextErrors.location = "Please enter the full location / address.";
		}
		if (values.imageUrl && !/^https?:\/\/.+/i.test(values.imageUrl.trim())) {
			nextErrors.imageUrl =
				"Image URL must be a valid link starting with http(s)://";
		}
		if (values.overview.trim().length < 30) {
			nextErrors.overview = "Overview must be at least 30 characters long.";
		}
		if (selectedAmenities.length === 0) {
			nextErrors.amenities = "Select or add at least one amenity.";
		}
		return nextErrors;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const nextErrors = validate();
		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			toast.error("Please fix the highlighted fields.");
			return;
		}

		setIsSubmitting(true);
		const payload = {
			...values,
			hourlyRate: Number(values.hourlyRate),
			securityDeposit: Number(values.securityDeposit || 0),
			maxCapacity: Number(values.maxCapacity),
			amenities: selectedAmenities,
			host: { name: userName, email: userEmail },
			status: "pending",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// JWT Token
		const jwtToken = await getTokenFromClient();

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify(payload),
				},
			);
			if (!res.ok) {
				toast.error("Problem occurred while creating studio listing");
				return;
			}
			toast.success("Studio listing created successfully!");
			setValues(initialFormValues);
			await revalidateStudioPaths(payload.category);
			setSelectedAmenities([]);
			setErrors({});
		} catch (error) {
			console.error("Submission error:", error);
			toast.error("A network error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const hasErrors = Object.values(errors).some(Boolean);

	return (
		<main className="min-h-screen">
			<div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
				{/* Page Heading */}
				<header className="mb-8">
					<Link
						href="/dashboard"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
					>
						<span aria-hidden="true">←</span> Back to dashboard
					</Link>

					<div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
								Add New Studio
							</h1>
							<p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
								List your creative space and let hundreds of photographers,
								podcasters, and musicians discover it.
							</p>
						</div>

						<span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary sm:self-auto">
							<LayoutGridCircles size={16} /> New Listing
						</span>
					</div>
				</header>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* =========================== Form =========================== */}
					<form
						onSubmit={handleSubmit}
						noValidate
						className="space-y-6 lg:col-span-2"
					>
						{/* Studio Details */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							<div className="mb-6 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
									<Camera size={20} />
								</span>
								<div>
									<h2 className="text-lg font-bold">Studio Details</h2>
									<p className="text-sm text-muted-foreground">
										Basic information guests will see first.
									</p>
								</div>
							</div>

							<div className="space-y-4">
								{/* Title */}
								<div>
									<label
										htmlFor="title"
										className="mb-2 block text-sm font-semibold"
									>
										Studio Title <span className="text-primary">*</span>
									</label>
									<input
										id="title"
										type="text"
										placeholder="e.g. Sunrise Photo Studio Loft"
										value={values.title}
										onChange={(e) => updateField("title", e.target.value)}
										className={inputClass}
									/>
									{errors.title && (
										<p className="mt-2 text-xs text-destructive">
											{errors.title}
										</p>
									)}
								</div>

								{/* Category */}
								<div>
									<label
										htmlFor="category"
										className="mb-2 block text-sm font-semibold"
									>
										Category <span className="text-primary">*</span>
									</label>
									<div className="relative">
										<select
											id="category"
											value={values.category}
											onChange={(e) => updateField("category", e.target.value)}
											className={`${inputClass} cursor-pointer appearance-none pr-10 disabled:cursor-default`}
										>
											<option value="" disabled>
												Select a studio category
											</option>
											{categories.map((category) => (
												<option key={category.value} value={category.value}>
													{category.label}
												</option>
											))}
										</select>
										<span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
											▾
										</span>
									</div>
									{errors.category && (
										<p className="mt-2 text-xs text-destructive">
											{errors.category}
										</p>
									)}
								</div>

								{/* Location / Address */}
								<div>
									<label
										htmlFor="location"
										className="mb-2 block text-sm font-semibold"
									>
										Location / Address <span className="text-primary">*</span>
									</label>
									<div className="relative">
										<MapPin
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="location"
											type="text"
											placeholder="e.g. 24 Green Street, Dhaka 1213"
											value={values.location}
											onChange={(e) => updateField("location", e.target.value)}
											className={`${inputClass} pl-10`}
										/>
									</div>
									{errors.location && (
										<p className="mt-2 text-xs text-destructive">
											{errors.location}
										</p>
									)}
								</div>

								{/* Image URL */}
								<div>
									<label
										htmlFor="imageUrl"
										className="mb-2 block text-sm font-semibold"
									>
										Image URL
									</label>
									<div className="relative">
										<ImageIcon
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="imageUrl"
											type="url"
											placeholder="https://images.unsplash.com/..."
											value={values.imageUrl}
											onChange={(e) => updateField("imageUrl", e.target.value)}
											className={`${inputClass} pl-10`}
										/>
									</div>
									<p className="mt-2 text-xs text-muted-foreground">
										Paste a direct link to your cover photo to preview it on the
										right.
									</p>
									{errors.imageUrl && (
										<p className="mt-1 text-xs text-destructive">
											{errors.imageUrl}
										</p>
									)}
								</div>
							</div>
						</section>

						{/* Pricing & Capacity */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							<div className="mb-6 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
									<BadgeDollarSign size={20} />
								</span>
								<div>
									<h2 className="text-lg font-bold">Pricing &amp; Capacity</h2>
									<p className="text-sm text-muted-foreground">
										Set fair rates — you can change them anytime.
									</p>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-3">
								{/* Hourly Rate */}
								<div>
									<label
										htmlFor="hourlyRate"
										className="mb-2 block text-sm font-semibold"
									>
										Hourly Rate ($) <span className="text-primary">*</span>
									</label>
									<div className="relative">
										<DollarSign
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="hourlyRate"
											type="number"
											min={1}
											placeholder="35"
											value={values.hourlyRate}
											onChange={(e) =>
												updateField("hourlyRate", e.target.value)
											}
											className={`${inputClass} pl-10`}
										/>
									</div>
									{errors.hourlyRate && (
										<p className="mt-2 text-xs text-destructive">
											{errors.hourlyRate}
										</p>
									)}
								</div>

								{/* Security Deposit */}
								<div>
									<label
										htmlFor="securityDeposit"
										className="mb-2 block text-sm font-semibold"
									>
										Security Deposit ($)
									</label>
									<div className="relative">
										<DollarSign
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="securityDeposit"
											type="number"
											min={0}
											placeholder="Optional"
											value={values.securityDeposit}
											onChange={(e) =>
												updateField("securityDeposit", e.target.value)
											}
											className={`${inputClass} pl-10`}
										/>
									</div>
									{errors.securityDeposit && (
										<p className="mt-2 text-xs text-destructive">
											{errors.securityDeposit}
										</p>
									)}
								</div>

								{/* Max Capacity */}
								<div>
									<label
										htmlFor="maxCapacity"
										className="mb-2 block text-sm font-semibold"
									>
										Max Capacity <span className="text-primary">*</span>
									</label>
									<div className="relative">
										<Users
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="maxCapacity"
											type="number"
											min={1}
											placeholder="12"
											value={values.maxCapacity}
											onChange={(e) =>
												updateField("maxCapacity", e.target.value)
											}
											className={`${inputClass} pl-10`}
										/>
									</div>
									{errors.maxCapacity && (
										<p className="mt-2 text-xs text-destructive">
											{errors.maxCapacity}
										</p>
									)}
								</div>
							</div>
						</section>

						{/* Amenities */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							<div className="mb-6 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
									<Sparkles size={20} />
								</span>
								<div>
									<h2 className="text-lg font-bold">Amenities</h2>
									<p className="text-sm text-muted-foreground">
										Pick what your space offers, or add your own.
									</p>
								</div>
							</div>

							{/* Amenity tags / checkboxes */}
							<div className="flex flex-wrap gap-2">
								{amenityOptions.map((amenity) => {
									const isSelected = selectedAmenities.includes(amenity);
									return (
										<label
											key={amenity}
											aria-pressed={isSelected}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
												isSelected
													? "border-primary bg-primary text-primary-foreground shadow-sm"
													: "border-input bg-background text-foreground hover:border-primary/60"
											}`}
										>
											<input
												type="checkbox"
												checked={isSelected}
												onChange={() => toggleAmenity(amenity)}
												className="sr-only"
											/>
											{isSelected ? <span aria-hidden="true">✓</span> : null}
											{amenity}
										</label>
									);
								})}

								{/* Selected custom amenities */}
								{selectedAmenities
									.filter(
										(amenity) => !amenityOptions.includes(amenity as never),
									)
									.map((amenity) => (
										<span
											key={amenity}
											className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary text-white/50 px-4 py-2 text-sm font-medium shadow-sm"
										>
											✓ {amenity}
											<button
												type="button"
												aria-label={`Remove ${amenity}`}
												onClick={() => toggleAmenity(amenity)}
												className="cursor-pointer rounded-full transition hover:opacity-70 bg-primary"
											>
												<X size={14} />
											</button>
										</span>
									))}
							</div>

							{/* Custom amenity input */}
							<div className="mt-4 flex gap-2">
								<input
									type="text"
									maxLength={30}
									placeholder="Add your own amenity (e.g. Fog Machine)"
									value={customAmenity}
									onChange={(e) => setCustomAmenity(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addCustomAmenity();
										}
									}}
									className={inputClass}
								/>
								<button
									type="button"
									onClick={addCustomAmenity}
									className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-secondary-hover sm:px-5"
								>
									<Plus size={16} /> Add
								</button>
							</div>

							{errors.amenities && (
								<p className="mt-2 text-xs text-destructive">
									{errors.amenities}
								</p>
							)}
						</section>

						{/* Detailed Overview */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							<div className="mb-6 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
									<FileText size={20} />
								</span>
								<div>
									<h2 className="text-lg font-bold">Detailed Overview</h2>
									<p className="text-sm text-muted-foreground">
										Describe the space, vibe, and rules for guests.
									</p>
								</div>
							</div>

							<textarea
								rows={6}
								maxLength={1200}
								placeholder="Tell guests about your studio — equipment available, layout, natural light, noise rules, cancellation policy, and anything else they should know before booking..."
								value={values.overview}
								onChange={(e) => updateField("overview", e.target.value)}
								className="w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20"
							/>
							<div className="mt-2 flex items-center justify-between">
								{errors.overview ? (
									<p className="text-xs text-destructive">{errors.overview}</p>
								) : (
									<p className="text-xs text-muted-foreground">
										Minimum 30 characters. Be honest and specific — good
										descriptions get booked 3× more.
									</p>
								)}
								<span className="text-xs text-muted-foreground">
									{values.overview.length}/1200
								</span>
							</div>
						</section>

						{/* Account info (read-only) */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							<div className="mb-6 flex items-center gap-3">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
									<User size={20} />
								</span>
								<div>
									<h2 className="text-lg font-bold">Host Account</h2>
									<p className="text-sm text-muted-foreground">
										Auto-filled from your StudioSpace account.
									</p>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label
										htmlFor="hostName"
										className="mb-2 block text-sm font-semibold"
									>
										Full Name
									</label>
									<div className="relative">
										<User
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="hostName"
											type="text"
											value={userName}
											readOnly
											aria-readonly="true"
											className={`${inputClass} bg-white/5 pl-10 text-white/50`}
										/>
										<Lock
											size={14}
											className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="hostEmail"
										className="mb-2 block text-sm font-semibold"
									>
										Email Address
									</label>
									<div className="relative">
										<Mail
											size={16}
											className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
										/>
										<input
											id="hostEmail"
											type="email"
											value={userEmail}
											readOnly
											aria-readonly="true"
											className={`${inputClass} bg-white/5 pl-10 text-white/50`}
										/>
										<Lock
											size={14}
											className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
										/>
									</div>
								</div>
							</div>
						</section>

						{/* Form-level error + Actions */}
						<div className="rounded-2xl border border-primary/30 bg-white/5 p-6 shadow-sm sm:p-8">
							{hasErrors && (
								<p className="mb-4 text-sm text-destructive">
									Please fix the highlighted fields above before submitting.
								</p>
							)}

							<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
								<button
									type="reset"
									className="inline-flex h-11 items-center justify-center rounded-lg border border-input px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
								>
									Reset Form
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
								>
									<Plus size={16} />
									{isSubmitting ? "Publishing..." : "Publish Studio Listing"}
								</button>
							</div>
						</div>
					</form>

					{/* ========================== Sidebar ========================== */}
					<aside className="space-y-6 lg:col-span-1">
						{/* Live Preview */}
						<section className="overflow-hidden rounded-2xl border border-primary/30 bg-white/5 shadow-sm">
							<div className="relative aspect-[4/3] bg-white/10">
								{values.imageUrl ? (
									<img
										src={values.imageUrl}
										alt="Live preview of the studio cover"
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/50">
										<ImageIcon size={32} />
										<span className="text-xs">Image preview</span>
									</div>
								)}

								{values.category && (
									<span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
										{categories.find((c) => c.value === values.category)?.label}
									</span>
								)}
							</div>

							<div className="space-y-2 p-5">
								<h3 className="text-lg font-bold">
									{values.title || "Your studio title"}
								</h3>
								<p className="flex items-center gap-1.5 text-sm text-white/50">
									<MapPin size={14} className="shrink-0" />
									<span className="truncate">
										{values.location || "Studio location"}
									</span>
								</p>
								<div className="flex flex-wrap gap-2 pt-1">
									<span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm font-semibold">
										${values.hourlyRate || "0"}/hour
									</span>
									<span className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/50">
										Up to {values.maxCapacity || "—"} guests
									</span>
								</div>
								{values.overview && (
									<p className="line-clamp-3 pt-1 text-sm text-white/50">
										{values.overview}
									</p>
								)}
							</div>

							<p className="border-t border-primary bg-white/5 px-5 py-3 text-xs text-white/50">
								This is how guests will see your listing.
							</p>
						</section>

						{/* Owner card */}
						<section className="rounded-2xl border border-primary/30 bg-white/5 p-5 shadow-sm">
							<h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
								Listed By
							</h3>
							<div className="flex items-center gap-3">
								<span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
									{userName.charAt(0).toUpperCase()}
								</span>
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold">{userName}</p>
									<p className="truncate text-xs text-white/50">{userEmail}</p>
								</div>
							</div>
						</section>

						{/* Tips */}
						<section className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
							<h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
								<Info size={16} className="text-primary" /> Tips for a great
								listing
							</h3>
							<ul className="space-y-2.5 text-sm text-muted-foreground">
								<li className="flex gap-2">
									<span className="text-primary" aria-hidden="true">
										•
									</span>
									Use a bright, high-resolution cover photo.
								</li>
								<li className="flex gap-2">
									<span className="text-primary" aria-hidden="true">
										•
									</span>
									Check nearby studios to price competitively.
								</li>
								<li className="flex gap-2">
									<span className="text-primary" aria-hidden="true">
										•
									</span>
									Include equipment and house rules in the overview.
								</li>
								<li className="flex gap-2">
									<span className="text-primary" aria-hidden="true">
										•
									</span>
									Deposits are refunded after a damage-free session.
								</li>
							</ul>
						</section>
					</aside>
				</div>
			</div>
		</main>
	);
};

export default AddNewStudio;
