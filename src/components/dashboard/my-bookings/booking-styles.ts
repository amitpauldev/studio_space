import { BookingStatus } from "@/type/bookingType";
import { fallbackDot, fallbackPill } from "../listing-styles";

export const bookingStatusBadge: Record<BookingStatus, string> = {
	pending: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
	confirmed: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
	completed: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
	cancelled: "bg-red-500/15 text-red-400 ring-red-500/30",
};

export const bookingStatusDot: Record<BookingStatus, string> = {
	pending: "bg-amber-400",
	confirmed: "bg-emerald-400",
	completed: "bg-sky-400",
	cancelled: "bg-red-400",
};

export const statusPill = (status: BookingStatus) =>
	bookingStatusBadge[status] ?? fallbackPill;

export const statusLoaderDot = (status: BookingStatus) =>
	bookingStatusDot[status] ?? fallbackDot;
