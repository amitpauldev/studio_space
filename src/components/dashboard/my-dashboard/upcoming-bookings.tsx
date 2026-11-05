import React from "react";
import Link from "next/link";
import {
	CalendarDays,
	Clock,
	ExternalLink,
	MapPin,
	Users,
} from "lucide-react";
import { Booking } from "@/type/bookingType";
import {
	statusPill,
	statusLoaderDot,
} from "../my-bookings/booking-styles";
import {
	formatBookingDate,
	formatTimeRange,
} from "../my-bookings/booking-utils";

type UpcomingBookingsProps = {
	bookings: Booking[];
	userEmail: string;
};

const UpcomingBookings = ({ bookings, userEmail }: UpcomingBookingsProps) => {
	return (
		<section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="flex items-center gap-2 text-base font-bold text-foreground">
					<CalendarDays size={18} className="text-primary" />
					Upcoming Bookings
					<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/30">
						{bookings.length}
					</span>
				</h2>
				<Link
					href="/my-bookings"
					className="text-xs font-semibold text-primary transition hover:underline"
				>
					View All →
				</Link>
			</div>

			{bookings.length === 0 ? (
				<div className="rounded-xl bg-black/20 p-6 text-center ring-1 ring-white/10">
					<CalendarDays size={28} className="mx-auto text-primary/60" />
					<p className="mt-2 font-semibold text-foreground">
						No upcoming bookings
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Request a time slot to see it here.
					</p>
					<Link
						href="/studios"
						className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
					>
						Browse Studios
					</Link>
				</div>
			) : (
				<ul className="divide-y divide-white/5">
					{bookings.map((booking) => {
						const isHost = booking.studio?.host?.email === userEmail;

						return (
							<li
								key={booking._id}
								className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
							>
								<img
									src={booking.studio?.imageUrl}
									alt={`Image of ${booking.studio?.title}`}
									className="h-12 w-16 shrink-0 rounded-lg bg-white/10 object-cover ring-1 ring-white/10"
								/>

								<div className="min-w-0 flex-1 space-y-1">
									<p className="flex items-center gap-2">
										<span className="truncate font-semibold text-foreground">
											{booking.studio?.title}
										</span>
										{isHost && (
											<span className="shrink-0 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-400 ring-1 ring-violet-500/30">
												Hosting
											</span>
										)}
									</p>
									<p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
										<span className="flex items-center gap-1">
											<MapPin size={11} className="shrink-0 text-primary/80" />
											<span className="max-w-32 truncate">
												{booking.studio?.location}
											</span>
										</span>
										<span className="flex items-center gap-1">
											<CalendarDays size={11} className="shrink-0 text-primary/80" />
											{formatBookingDate(booking.bookingDate)}
										</span>
										<span className="flex items-center gap-1">
											<Clock size={11} className="shrink-0 text-primary/80" />
											{formatTimeRange(booking.bookingStart, booking.bookingDuration)}
										</span>
										<span className="flex items-center gap-1">
											<Users size={11} className="shrink-0 text-primary/80" />
											{booking.guests}
										</span>
									</p>
								</div>

								<div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
									<span
										className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold capitalize ring-1 ${
											statusPill(booking.status)
										}`}
									>
										<span
											className={`h-1.5 w-1.5 rounded-full ${statusLoaderDot(booking.status)}`}
										/>
										{booking.status}
									</span>

									{booking.studio?._id && (
										<Link
											href={`/studio-details/${booking.studio._id}`}
											className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold text-primary transition hover:bg-primary/20"
										>
											<ExternalLink size={12} /> Details
										</Link>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};

export default UpcomingBookings;
