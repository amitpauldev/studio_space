import { Studio, StudioHost } from "./studioType";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
	_id?: string;
	studio: Studio;
	bookingDate: string;
	bookingStart: string;
	bookingDuration: number;
	guests: number;
	renter: StudioHost;
	status: BookingStatus;
	createdAt?: string;
}
