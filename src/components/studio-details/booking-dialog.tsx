"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CircleDollarSign, Timer } from "lucide-react";
import type { Studio } from "@/type/studioType";

type BookingDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	studio: Studio;
};

const START_TIMES = [
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
	"18:00",
	"19:00",
	"20:00",
] as const;

const DURATIONS = [1, 2, 3, 4, 6, 8, 12] as const;

const fieldLabel =
	"mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/50";
const fieldClass =
	"w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm text-foreground ring-1 ring-white/10 outline-none placeholder:text-foreground/40 transition-[box-shadow] duration-300 focus:ring-primary/60 [&>option]:bg-white [&>option]:text-neutral-900";

// "14:00" + 3 hours → "02:00"
const minutesFromTime = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	return (hours + 24) * 60 + minutes;
};

const formatMinutes = (minutes: number) => {
	const hour = Math.floor((minutes % (24 * 60)) / 60);
	const period = hour >= 12 ? "PM" : "AM";
	const displayHour = ((hour + 11) % 12) + 1;
	return `${displayHour}:00 ${period}`;
};

const BookingDialog = ({ open, onOpenChange, studio }: BookingDialogProps) => {
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("15:00");
	const [hours, setHours] = useState(2);
	const [guests, setGuests] = useState(1);

	const basePrice = studio.hourlyRate * hours;
	const deposit = Math.max(studio.securityDeposit, 0);
	const total = basePrice + deposit;

	const endTime = formatMinutes(minutesFromTime(startTime) + hours * 60);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		toast.success(`Booking request sent for ${studio.title}!`, {
			duration: 4000,
		});
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold text-foreground">
						Book {studio.title}
					</DialogTitle>
					<DialogDescription>
						Pick a date and time slot to request the space. Payments are
						confirmed by the host later.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* Date */}
						<div>
							<label htmlFor="booking-date" className={fieldLabel}>
								Date
							</label>
							<input
								id="booking-date"
								type="date"
								value={date}
								onChange={(event) => setDate(event.target.value)}
								required
								className={fieldClass}
							/>
						</div>

						{/* Guests */}
						<div>
							<label htmlFor="booking-guests" className={fieldLabel}>
								Guests
							</label>
							<input
								id="booking-guests"
								type="number"
								min={1}
								max={studio.maxCapacity}
								value={guests}
								onChange={(event) => setGuests(Number(event.target.value))}
								required
								className={fieldClass}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* Start time */}
						<div>
							<label htmlFor="booking-start" className={fieldLabel}>
								Start time
							</label>
							<select
								id="booking-start"
								value={startTime}
								onChange={(event) => setStartTime(event.target.value)}
								className={`${fieldClass} cursor-pointer`}
							>
								{START_TIMES.map((time) => (
									<option key={time} value={time}>
										{formatMinutes(minutesFromTime(time))}
									</option>
								))}
							</select>
						</div>

						{/* Duration */}
						<div>
							<label htmlFor="booking-duration" className={fieldLabel}>
								Duration
							</label>
							<select
								id="booking-duration"
								value={hours}
								onChange={(event) => setHours(Number(event.target.value))}
								className={`${fieldClass} cursor-pointer`}
							>
								{DURATIONS.map((duration) => (
									<option key={duration} value={duration}>
										{duration} hour{duration !== 1 && "s"}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Time summary */}
					{date && (
						<p className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs text-foreground/70 ring-1 ring-primary/30">
							<Timer size={14} className="shrink-0 text-primary" />
							{new Date(date).toLocaleDateString("en-US", {
								weekday: "short",
								month: "short",
								day: "numeric",
								timeZone: "UTC",
							})}
							, {formatMinutes(minutesFromTime(startTime))} – {endTime}
						</p>
					)}

					{/* Price summary */}
					<div className="flex flex-col gap-2 rounded-xl bg-black/20 p-4 text-sm ring-1 ring-white/10">
						<div className="flex items-center justify-between text-foreground/70">
							<span>
								${studio.hourlyRate} / hr × {hours} hour{hours !== 1 && "s"}
							</span>
							<span className="font-semibold">${basePrice}</span>
						</div>
						<div className="flex items-center justify-between text-foreground/70">
							<span>Security deposit (refundable)</span>
							<span className="font-semibold">${deposit}</span>
						</div>
						<div className="flex items-center justify-between border-t border-white/10 pt-2 text-base">
							<span className="flex items-center gap-1.5 font-semibold">
								<CircleDollarSign size={16} className="text-primary" />
								Total
							</span>
							<span className="font-bold text-primary">${total}</span>
						</div>
					</div>

					<Button type="submit" className="h-11 w-full rounded-xl">
						Confirm Booking Request
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default BookingDialog;
