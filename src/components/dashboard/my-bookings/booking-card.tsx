import React, { useState } from "react";
import Link from "next/link";
import {
	CalendarDays,
	Clock,
	ExternalLink,
	MapPin,
	Users,
	XCircle,
} from "lucide-react";
import { Booking } from "@/type/bookingType";
import { categoryPill, fallbackPill } from "../my-listings/listing-styles";
import { statusLoaderDot, statusPill } from "./booking-styles";
import { formatBookingDate, formatTimeRange } from "./booking-utils";

type BookingCardProps = {
	booking: Booking;
	isCancelling: boolean;
	onCancel: (booking: Booking) => void;
};

const detailRow = "flex items-center gap-2 text-sm text-muted-foreground";

const BookingCard = ({ booking, isCancelling, onCancel }: BookingCardProps) => {
	const [confirming, setConfirming] = useState(false);

	const total = (booking.studio?.hourlyRate ?? 0) * booking.bookingDuration;

	return (
		<article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20">
			<div className="relative aspect-[16/9] bg-white/10">
				<img
					src={booking.studio.imageUrl}
					alt={`Image of ${booking.studio.title}`}
					className="h-full w-full object-cover"
				/>
				<span
					className={`absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 backdrop-blur-sm ${statusPill(
						booking.status,
					)}`}
				>
					<span
						className={`h-1.5 w-1.5 rounded-full ${statusLoaderDot(booking.status)}`}
					/>
					{booking.status}
				</span>
				<span
					className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 backdrop-blur-sm ${
						categoryPill[booking.studio.category] ?? fallbackPill
					}`}
				>
					{booking.studio.category.replace("-", " ")}
				</span>
			</div>

			<div className="space-y-3 p-4">
				<div>
					<h2 className="truncate font-bold text-foreground">
						{booking.studio.title}
					</h2>
					<p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
						<MapPin size={14} className="shrink-0 text-primary/80" />
						<span className="truncate">{booking.studio.location}</span>
					</p>
				</div>

				<div className="space-y-2 rounded-xl bg-black/20 p-3 ring-1 ring-white/10">
					<p className={detailRow}>
						<CalendarDays size={14} className="shrink-0 text-primary/80" />
						{formatBookingDate(booking.bookingDate)}
					</p>
					<p className={detailRow}>
						<Clock size={14} className="shrink-0 text-primary/80" />
						{formatTimeRange(booking.bookingStart, booking.bookingDuration)}
						{" · "}
						{booking.bookingDuration} hr{booking.bookingDuration !== 1 && "s"}
					</p>
					<p className={detailRow}>
						<Users size={14} className="shrink-0 text-primary/80" />
						{booking.guests} guest{booking.guests !== 1 && "s"}
					</p>
					<div className="flex items-center justify-between border-t border-white/10 pt-2">
						<span className="text-xs text-muted-foreground">
							${booking.studio.hourlyRate}/hr × {booking.bookingDuration} hr
						</span>
						<span className="text-base font-extrabold text-primary">
							${total}
						</span>
					</div>
				</div>

				{booking.studio._id && (
					<div className="space-y-2 border-t border-white/10 pt-3">
						{booking.status === "pending" && (
							<div className="flex gap-2">
								{confirming ? (
									<>
										<button
											type="button"
											disabled={isCancelling}
											onClick={() => onCancel(booking)}
											className="cursor-pointer flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-700 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
										>
											<XCircle size={14} />
											{isCancelling ? "Cancelling…" : "Confirm Cancel"}
										</button>
										<button
											type="button"
											onClick={() => setConfirming(false)}
											className="flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
										>
											Keep It
										</button>
									</>
								) : (
									<button
										type="button"
										disabled={isCancelling}
										onClick={() => setConfirming(true)}
										className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
									>
										<XCircle size={14} /> Cancel Booking
									</button>
								)}
							</div>
						)}

						<Link
							href={`/studio-details/${booking.studio._id}`}
							className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20"
						>
							<ExternalLink size={14} /> View Details
						</Link>
					</div>
				)}
			</div>
		</article>
	);
};

export default BookingCard;
