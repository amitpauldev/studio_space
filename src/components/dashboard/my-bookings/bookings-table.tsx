import React, { useState } from "react";
import {
	CalendarDays,
	Clock,
	Loader2,
	MapPin,
	Users,
	XCircle,
} from "lucide-react";
import { Booking } from "@/type/bookingType";
import { categoryPill, fallbackPill } from "../my-listings/listing-styles";
import { statusLoaderDot, statusPill } from "./booking-styles";
import { formatBookingDate, formatTimeRange } from "./booking-utils";

type BookingsTableProps = {
	bookings: Booking[];
	isCancellingId: string | null;
	onCancel: (booking: Booking) => void;
};

const statusBadgeBase =
	"inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold capitalize ring-1";

const categoryPillBase =
	"inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ring-1";

const BookingsTable = ({
	bookings,
	isCancellingId,
	onCancel,
}: BookingsTableProps) => {
	return (
		<div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 md:block">
			<table className="w-full text-left">
				<thead>
					<tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
						<th className="px-5 py-4 font-semibold">Studio</th>
						<th className="px-4 py-4 font-semibold">Date &amp; Time</th>
						<th className="px-4 py-4 font-semibold">Guests</th>
						<th className="px-4 py-4 font-semibold">Total</th>
						<th className="px-4 py-4 font-semibold">Status</th>
						<th className="px-5 py-4 text-right font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking) => (
						<BookingRow
							key={booking._id}
							booking={booking}
							isCancelling={isCancellingId === booking._id}
							onCancel={onCancel}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

const BookingRow = ({
	booking,
	isCancelling,
	onCancel,
}: {
	booking: Booking;
	isCancelling: boolean;
	onCancel: (booking: Booking) => void;
}) => {
	const [confirming, setConfirming] = useState(false);

	const total = (booking.studio?.hourlyRate ?? 0) * booking.bookingDuration;

	return (
		<tr className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/5">
			{/* Studio */}
			<td className="py-4 pl-5 pr-4">
				<div className="flex items-center gap-3.5">
					<img
						src={booking.studio.imageUrl}
						alt={`Image of ${booking.studio.title}`}
						className="h-14 w-20 shrink-0 rounded-xl bg-white/10 object-cover ring-1 ring-white/10"
					/>
					<div className="min-w-0 space-y-1">
						<p className="truncate font-semibold text-foreground">
							{booking.studio.title}
						</p>
						<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<MapPin size={12} className="shrink-0 text-primary/80" />
							<span className="max-w-36 truncate">
								{booking.studio.location}
							</span>
						</p>
						<span
							className={`${categoryPillBase} ${
								categoryPill[booking.studio.category] ?? fallbackPill
							}`}
						>
							{booking.studio.category.replace("-", " ")}
						</span>
					</div>
				</div>
			</td>

			{/* Date & time */}
			<td className="px-4 py-4">
				<p className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold">
					<CalendarDays size={14} className="text-primary/80" />
					{formatBookingDate(booking.bookingDate)}
				</p>
				<p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground">
					<Clock size={12} />
					{formatTimeRange(booking.bookingStart, booking.bookingDuration)}
					{" · "}
					{booking.bookingDuration} hr{booking.bookingDuration !== 1 && "s"}
				</p>
			</td>

			{/* Guests */}
			<td className="px-4 py-4">
				<p className="flex items-center gap-1.5 text-sm text-muted-foreground">
					<Users size={14} /> {booking.guests}
				</p>
			</td>

			{/* Total */}
			<td className="px-4 py-4">
				<p className="whitespace-nowrap text-lg font-extrabold text-primary">
					<span className="align-baseline text-sm font-medium">$</span>
					{total}
				</p>
				<p className="mt-0.5 whitespace-nowrap text-xs text-muted-foreground">
					${booking.studio.hourlyRate}/hr × {booking.bookingDuration} hr
				</p>
			</td>

			{/* Status */}
			<td className="px-4 py-4">
				<span className={`${statusBadgeBase} ${statusPill(booking.status)}`}>
					<span
						className={`h-1.5 w-1.5 rounded-full ${statusLoaderDot(booking.status)}`}
					/>
					{booking.status}
				</span>
			</td>

			{/* Actions */}
			<td className="px-5 py-4 text-right">
				{booking.status === "pending" ? (
					confirming ? (
						<div className="inline-flex items-center justify-end gap-2">
							<span className="text-[11px] font-medium text-muted-foreground">
								Sure?
							</span>
							<button
								type="button"
								disabled={isCancelling}
								onClick={() => onCancel(booking)}
								className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-red-500 px-3 text-xs font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isCancelling ? (
									<Loader2 size={13} className="animate-spin" />
								) : (
									<XCircle size={13} />
								)}
								{isCancelling ? "Cancelling…" : "Confirm"}
							</button>
							<button
								type="button"
								onClick={() => setConfirming(false)}
								className="inline-flex h-8 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
							>
								No
							</button>
						</div>
					) : (
						<button
							type="button"
							disabled={isCancelling}
							onClick={() => setConfirming(true)}
							className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
						>
							<XCircle size={13} /> Cancel Booking
						</button>
					)
				) : (
					<span
						title={
							booking.status === "confirmed"
								? "Confirmed by the host"
								: booking.status === "completed"
									? "Session completed"
									: "Booking was cancelled"
						}
						className="text-sm text-foreground/40"
					>
						—
					</span>
				)}
			</td>
		</tr>
	);
};

export default BookingsTable;
