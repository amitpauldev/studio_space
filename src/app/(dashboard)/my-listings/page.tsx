"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, LogIn, Plus, TriangleAlert } from "lucide-react";
import ListingsTable from "@/components/dashboard/listings-table";
import ListingCard from "@/components/dashboard/listing-card";
import { authClient } from "@/lib/auth-client";
import { Studio } from "@/type/studioType";

const MyListings = () => {
	const [studios, setStudios] = useState<Studio[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const { data: session, isPending } = authClient.useSession();
	const userEmail = session?.user?.email;
	const userName = session?.user?.name || "User";
	const userInitial = userName.charAt(0).toUpperCase();

	useEffect(() => {
		if (isPending) return;

		const fetchStudios = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios`,
				);

				if (!res.ok) {
					throw new Error("Failed to fetch studios");
				}

				const studios: Studio[] = await res.json();
				setStudios(studios);
				setHasError(false);
			} catch (error) {
				console.error(error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudios();
	}, [isPending, refreshKey]);

	// only user's listings
	const listings = useMemo(
		() =>
			userEmail
				? studios.filter((studio) => studio.host?.email === userEmail)
				: [],
		[studios, userEmail],
	);

	/* ---------- Loading screen ---------- */
	if (isPending || isLoading) {
		return (
			<main className="min-h-screen">
				<div className="mx-auto max-w-screen-xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
					<div className="h-10 w-64 animate-pulse rounded-lg bg-white/5" />
					<div className="h-20 animate-pulse rounded-2xl bg-white/5" />
					<div className="space-y-3">
						{Array.from({ length: 4 }).map((_, index) => (
							<div
								key={index}
								className="h-20 animate-pulse rounded-2xl bg-white/5"
							/>
						))}
					</div>
				</div>
			</main>
		);
	}

	/* ---------- Not logged in ---------- */
	if (!userEmail) {
		return (
			<main className="min-h-screen">
				<div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
					<div className="rounded-2xl border border-primary/30 bg-white/5 p-12 text-center">
						<LogIn size={40} className="mx-auto text-primary" />
						<h1 className="mt-4 text-2xl font-bold">
							Please log in to view your listings
						</h1>
						<p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
							Your studio listings are tied to your StudioSpace account. Log in
							to see the spaces registered to you.
						</p>
						<Link
							href="/login"
							className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
						>
							<LogIn size={16} /> Log In
						</Link>
					</div>
				</div>
			</main>
		);
	}

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
								My Studio Listings
							</h1>
							<p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
								Spaces registered to{" "}
								<span className="font-medium text-foreground">{userName}</span>{" "}
								—{" "}
								<span className="font-medium text-primary underline decoration-dotted underline-offset-2">
									{userEmail}
								</span>
								.
							</p>
						</div>

						<div className="flex items-center gap-3 self-start sm:self-auto">
							<span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
								<Building2 size={16} /> {listings.length}{" "}
								{listings.length === 1 ? "listing" : "listings"}
							</span>
							<Link
								href="/add-new-studio"
								className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
							>
								<Plus size={16} /> Add New Studio
							</Link>
						</div>
					</div>
				</header>

				{/* Owner strip */}
				<section className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/30 bg-white/5 p-4 pl-5 shadow-sm">
					<span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-sm font-bold text-primary-foreground">
						{userInitial}
					</span>
					<div className="min-w-0">
						<p className="text-sm font-semibold">{userName}</p>
						<p className="truncate text-xs text-muted-foreground">
							{userEmail}
						</p>
					</div>
					<span className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 sm:inline-flex">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
						Showing listings owned by you only
					</span>
				</section>

				{/* Listings */}
				{hasError ? (
					<div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
						<TriangleAlert size={40} className="mx-auto text-amber-400" />
						<h2 className="mt-4 text-xl font-bold">
							Couldn&apos;t load your listings
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Something went wrong while fetching your studios. Please try
							again.
						</p>
						<button
							type="button"
							onClick={() => {
								setIsLoading(true);
								setRefreshKey((key) => key + 1);
							}}
							className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
						>
							Try Again
						</button>
					</div>
				) : listings.length > 0 ? (
					<>
						{/* Desktop table */}
						<ListingsTable listings={listings} />

						{/* Mobile cards */}
						<div className="space-y-4 md:hidden">
							{listings.map((listing) => (
								<ListingCard key={listing._id} listing={listing} />
							))}
						</div>
					</>
				) : (
					<div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
						<Building2 size={40} className="mx-auto text-primary" />
						<h2 className="mt-4 text-xl font-bold">No listings yet</h2>
						<p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
							You haven&apos;t listed any studios yet. Publish your first space
							and start hosting creatives today.
						</p>
						<Link
							href="/add-new-studio"
							className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
						>
							<Plus size={16} /> Add Your First Studio
						</Link>
					</div>
				)}
			</div>
		</main>
	);
};

export default MyListings;
