"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LogIn, Sparkles, TriangleAlert } from "lucide-react";
import ProfileCard from "@/components/dashboard/my-dashboard/profile-card";
import LogoutButton from "@/components/dashboard/my-dashboard/logout-button";
import QuickActions from "@/components/dashboard/my-dashboard/quick-actions";
import UpcomingBookings from "@/components/dashboard/my-dashboard/upcoming-bookings";
import Notifications from "@/components/dashboard/my-dashboard/notifications";
import {
	buildNotifications,
	getUpcomingBookings,
} from "@/components/dashboard/my-dashboard/dashboard-utils";
import { authClient } from "@/lib/auth-client";
import { Booking } from "@/type/bookingType";
import { Studio } from "@/type/studioType";

const Dashboard = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [studios, setStudios] = useState<Studio[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const { data: session, isPending } = authClient.useSession();
	const user = session?.user;
	const userEmail = user?.email ?? "";
	const userName = user?.name || "User";
	const userImage = user?.image || "/images/default-user.png";

	useEffect(() => {
		if (isPending) return;

		const fetchDashboardData = async () => {
			try {
				// isolated requests so one failure doesn't hide the other's data
				const bookingsRes = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`,
				);
				const studiosRes = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios`,
				);

				if (!bookingsRes.ok || !studiosRes.ok) {
					throw new Error("Failed to fetch dashboard data");
				}

				const bookingsData: Booking[] = await bookingsRes.json();
				const studiosData: Studio[] = await studiosRes.json();
				setBookings(bookingsData);
				setStudios(studiosData);
				setHasError(false);
			} catch (error) {
				console.error(error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDashboardData();
	}, [isPending, refreshKey]);

	/* ---------- Derived dashboard data ---------- */
	const upcomingBookings = useMemo(
		() => getUpcomingBookings(bookings, userEmail),
		[bookings, userEmail],
	);
	const notifications = useMemo(
		() => buildNotifications(bookings, userEmail),
		[bookings, userEmail],
	);
	const myStudiosCount = useMemo(
		() =>
			userEmail
				? studios.filter((studio) => studio.host?.email === userEmail).length
				: 0,
		[studios, userEmail],
	);
	const myBookingsCount = useMemo(
		() =>
			userEmail
				? bookings.filter((booking) => booking.renter?.email === userEmail)
						.length
				: 0,
		[bookings, userEmail],
	);
	const totalStudiosCount = useMemo(
		() => studios.filter((studio) => studio.status === "approved").length,
		[studios],
	);

	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	/* ---------- Loading screen ---------- */
	if (isPending || isLoading) {
		return (
			<main className="min-h-screen">
				<div className="mx-auto max-w-screen-xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
					<div className="h-28 animate-pulse rounded-2xl bg-white/5" />
					<div className="grid gap-6 lg:grid-cols-5">
						<div className="space-y-6 lg:col-span-2">
							<div className="h-44 animate-pulse rounded-2xl bg-white/5" />
							<div className="h-56 animate-pulse rounded-2xl bg-white/5" />
						</div>
						<div className="space-y-6 lg:col-span-3">
							<div className="h-40 animate-pulse rounded-2xl bg-white/5" />
							<div className="h-72 animate-pulse rounded-2xl bg-white/5" />
						</div>
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
							Please log in to view your dashboard
						</h1>
						<p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
							Your profile, bookings and studio activity are tied to your
							StudioSpace account.
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
				{/* Welcome banner */}
				<header className="mb-8 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 shadow-lg shadow-black/20 sm:p-8">
					<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						{today}
					</p>
					<h1 className="mt-2 flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight md:text-3xl">
						Welcome back, <span className="text-primary">{userName}</span>!
						<Sparkles size={22} className="text-primary" />
					</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
						You have{" "}
						<span className="font-medium text-foreground">
							{upcomingBookings.length} upcoming{" "}
							{upcomingBookings.length === 1 ? "booking" : "bookings"}
						</span>{" "}
						and{" "}
						<span className="font-medium text-primary">
							{notifications.length} new{" "}
							{notifications.length === 1 ? "notification" : "notifications"}
						</span>{" "}
						to catch up on.
					</p>
				</header>

				{/* Error strip */}
				{hasError && (
					<div className="mb-6 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:flex-row sm:text-left">
						<TriangleAlert size={28} className="shrink-0 text-amber-400" />
						<p className="flex-1 text-sm text-muted-foreground">
							Some dashboard data couldn&apos;t be loaded. Showing what we
							have.
						</p>
						<button
							type="button"
							onClick={() => {
								setIsLoading(true);
								setRefreshKey((key) => key + 1);
							}}
							className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
						>
							Try Again
						</button>
					</div>
				)}

				{/* Dashboard grid */}
				<div className="grid gap-6 lg:grid-cols-5">
					{/* Left column: profile + quick actions */}
					<div className="space-y-6 lg:col-span-2">
						<ProfileCard
							userName={userName}
							userEmail={userEmail}
							userImage={userImage}
						/>

						<LogoutButton />

						<QuickActions
							myStudiosCount={myStudiosCount}
							totalStudiosCount={totalStudiosCount}
							myBookingsCount={myBookingsCount}
						/>
					</div>

					{/* Right column: notifications + upcoming bookings */}
					<div className="space-y-6 lg:col-span-3">
						<Notifications notifications={notifications} />
						<UpcomingBookings bookings={upcomingBookings} userEmail={userEmail} />
					</div>
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
