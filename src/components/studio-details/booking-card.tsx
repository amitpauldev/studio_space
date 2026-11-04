"use client";

import { useState } from "react";
import { BadgeCheck, Clock3, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Studio } from "@/type/studioType";
import BookingDialog from "./booking-dialog";

type BookingCardProps = {
	studio: Studio;
};

const BookingCard = ({ studio }: BookingCardProps) => {
	const [open, setOpen] = useState(false);

	return (
		<section className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
			<p className="text-3xl font-bold text-primary">
				${studio.hourlyRate}
				<span className="text-base font-normal text-foreground/60"> / hr</span>
			</p>
			<p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
				<Users size={14} className="shrink-0" />
				Up to {studio.maxCapacity} guests
			</p>

			<ul className="my-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-foreground/70">
				<li className="flex items-center gap-2">
					<Clock3 size={14} className="shrink-0 text-primary" />
					Minimum 1 hour booking
				</li>
				<li className="flex items-center gap-2">
					<ShieldCheck size={14} className="shrink-0 text-primary" />
					${studio.securityDeposit} refundable deposit
				</li>
				<li className="flex items-center gap-2">
					<BadgeCheck size={14} className="shrink-0 text-primary" />
					Free cancellation up to 48h
				</li>
			</ul>

			<Button
				onClick={() => setOpen(true)}
				className="h-11 w-full rounded-xl text-base font-semibold"
			>
				Book Space Now
			</Button>

			<p className="mt-3 text-center text-xs text-foreground/40">
				No payment required — request only
			</p>

			<BookingDialog open={open} onOpenChange={setOpen} studio={studio} />
		</section>
	);
};

export default BookingCard;
