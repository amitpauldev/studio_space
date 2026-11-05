import { Booking, BookingStatus } from "@/type/bookingType";

/* ---------------- Dismissed notification persistence ---------------- */

const DISMISSED_KEY = "studiospace:dismissed-notifications";

export const readDismissedIds = (): string[] => {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(DISMISSED_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
	} catch {
		return [];
	}
};

export const writeDismissedIds = (ids: string[]) => {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(DISMISSED_KEY, JSON.stringify(ids));
	} catch {
		// storage unavailable — dismissals simply won't persist
	}
};

/* ---------------- Upcoming bookings ---------------- */

/** ISO date (YYYY-MM-DD) of "today", comparable to bookingDate strings. */
const todayISO = () => new Date().toISOString().slice(0, 10);

const slotSignature = (booking: Booking) =>
	`${booking.bookingDate}T${booking.bookingStart}`;

/** User's future pending/confirmed slots — both as renter and as host — soonest first. */
export const getUpcomingBookings = (bookings: Booking[], userEmail: string) =>
	bookings
		.filter(
			(booking) =>
				(["pending", "confirmed"] as BookingStatus[]).includes(booking.status) &&
				booking.bookingDate >= todayISO(),
		)
		.filter(
			(booking) =>
				booking.renter?.email === userEmail ||
				booking.studio?.host?.email === userEmail,
		)
		.sort((a, b) => slotSignature(a).localeCompare(slotSignature(b)));

/* ---------------- Notifications (derived from bookings) ---------------- */

export type DashboardNotificationType =
	| "host-request"
	| "renter-confirmed"
	| "renter-completed"
	| "renter-cancelled";

export interface DashboardNotification {
	/** Stable id used for dismiss persistence. */
	id: string;
	type: DashboardNotificationType;
	message: string;
	createdAt: string;
}

const builders: Record<
	DashboardNotificationType,
	(booking: Booking) => string
> = {
	"host-request": (booking) =>
		`New booking request from ${booking.renter?.name ?? "a guest"} for ${booking.studio?.title ?? "your studio"}.`,
	"renter-confirmed": (booking) =>
		`Your booking for ${booking.studio?.title ?? "a studio"} was confirmed by the host.`,
	"renter-completed": (booking) =>
		`Your session at ${booking.studio?.title ?? "the studio"} is completed. Hope it was great!`,
	"renter-cancelled": (booking) =>
		`Your booking for ${booking.studio?.title ?? "a studio"} was cancelled.`,
};

export const notificationPill: Record<DashboardNotificationType, string> = {
	"host-request": "bg-amber-500/15 text-amber-400 ring-amber-500/30",
	"renter-confirmed": "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
	"renter-completed": "bg-sky-500/15 text-sky-400 ring-sky-500/30",
	"renter-cancelled": "bg-red-500/15 text-red-400 ring-red-500/30",
};

/**
 * Derives activity notifications from raw bookings:
 * - hosts: every pending request made on a studio they own
 * - renters: status transitions (confirmed / completed / cancelled) on their own bookings
 */
export const buildNotifications = (
	bookings: Booking[],
	userEmail: string,
): DashboardNotification[] => {
	if (!userEmail) return [];

	const notifications: DashboardNotification[] = [];

	bookings.forEach((booking) => {
		const id = String(booking._id ?? "");

		if (!id) return;

		// New request on a studio I host
		if (
			booking.studio?.host?.email === userEmail &&
			booking.status === "pending"
		) {
			notifications.push({
				id: `${id}:host-request`,
				type: "host-request",
				message: builders["host-request"](booking),
				createdAt: booking.createdAt ?? booking.bookingDate,
			});
		}

		// Status change on a booking I made
		if (booking.renter?.email === userEmail) {
			const type: DashboardNotificationType | null =
				booking.status === "confirmed"
					? "renter-confirmed"
					: booking.status === "completed"
						? "renter-completed"
						: booking.status === "cancelled"
							? "renter-cancelled"
							: null;

			if (type) {
				notifications.push({
					id: `${id}:${type}`,
					type,
					message: builders[type](booking),
					createdAt: booking.createdAt ?? booking.bookingDate,
				});
			}
		}
	});

	return notifications
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.slice(0, 8);
};
