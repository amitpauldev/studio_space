"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
	CalendarDays,
	CalendarX,
	LogIn,
	TriangleAlert,
} from "lucide-react";
import BookingsTable from "@/components/dashboard/my-bookings/bookings-table";
import BookingCard from "@/components/dashboard/my-bookings/booking-card";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getJwtToken";
import { revalidateMyBookingsPaths } from "@/lib/actions/studio";
import { Booking } from "@/type/bookingType";

const MyBookings = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [isCancellingId, setIsCancellingId] = useState<string | null>(null);

	const { data: session, isPending } = authClient.useSession();
	const userEmail = session?.user?.email;
	const userName = session?.user?.name || "User";

	useEffect(() => {
		if (isPending) return;

		const fetchBookings = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`,
				);

				if (!res.ok) {
					throw new Error("Failed to fetch bookings");
				}

				const allBookings: Booking[] = await res.json();
				setBookings(allBookings);
				setHasError(false);
			} catch (error) {
				console.error(error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBookings();
	}, [isPending, refreshKey]);

	/* ---------- Current user's bookings, soonest first ---------- */
	const myBookings = useMemo(
		() =>
			userEmail
				? bookings
						.filter((booking) => booking.renter?.email === userEmail)
						.sort((a, b) => {
							const slot = (booking: Booking) =>
								`${booking.bookingDate}T${booking.bookingStart}`;
							return slot(a).localeCompare(slot(b));
						})
				: [],
		[bookings, userEmail],
	);

	/* ---------- Cancel a pending booking ---------- */
	const handleCancelBooking = async (booking: Booking) => {
		if (!booking._id || isCancellingId) return;

		setIsCancellingId(booking._id);
		const jwtToken = await getTokenFromClient();

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${booking._id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify({ status: "cancelled" }),
				},
			);

			if (!res.ok) {
				toast.error("Couldn't cancel the booking. Please try again.");
				return;
			}

			setBookings((prev) =>
				prev.map((item) =>
					item._id === booking._id
						? { ...item, status: "cancelled" as const }
						: item,
				),
			);
			toast.success("Booking cancelled successfully", { duration: 4000 });
			await revalidateMyBookingsPaths();
		} catch (error) {
			console.error("Cancel booking error:", error);
			toast.error("A network error occurred. Please try again.");
		} finally {
			setIsCancellingId(null);
		}
	};

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
							Please log in to view your bookings
						</h1>
						<p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
							Your reservations are tied to your StudioSpace account. Log in
							to see the time slots you have requested.
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
								My Bookings
							</h1>
							<p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
								Slot reservations made by{" "}
								<span className="font-medium text-foreground">{userName}</span>{" "}
								—{" "}
								<span className="font-medium text-primary underline decoration-dotted underline-offset-2">
									{userEmail}
								</span>
								. Pending requests can be cancelled anytime.
							</p>
						</div>

						<span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary sm:self-auto">
							<CalendarDays size={16} /> {myBookings.length}{" "}
							{myBookings.length === 1 ? "booking" : "bookings"}
						</span>
					</div>
				</header>

				{/* Bookings */}
				{hasError ? (
					<div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
						<TriangleAlert size={40} className="mx-auto text-amber-400" />
						<h2 className="mt-4 text-xl font-bold">
							Couldn&apos;t load your bookings
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Something went wrong while fetching your reservations. Please
							try again.
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
				) : myBookings.length > 0 ? (
					<>
						{/* Desktop table */}
						<BookingsTable
							bookings={myBookings}
							isCancellingId={isCancellingId}
							onCancel={handleCancelBooking}
						/>

						{/* Mobile cards */}
						<div className="space-y-4 md:hidden">
							{myBookings.map((booking) => (
								<BookingCard
									key={booking._id}
									booking={booking}
									isCancelling={isCancellingId === booking._id}
									onCancel={handleCancelBooking}
								/>
							))}
						</div>
					</>
				) : (
					<div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
						<CalendarX size={40} className="mx-auto text-primary" />
						<h2 className="mt-4 text-xl font-bold">No bookings yet</h2>
						<p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
							You haven&apos;t reserved any studios yet. Browse the spaces and
							request your first time slot today.
						</p>
						<Link
							href="/studios"
							className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
						>
							<CalendarDays size={16} /> Browse Studios
						</Link>
					</div>
				)}
			</div>
		</main>
	);
};

export default MyBookings;
