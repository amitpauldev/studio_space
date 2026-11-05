"use client";

import React, { useState } from "react";
import {
	BellOff,
	MailQuestion,
	MinusCircle,
	ShieldCheck,
	TimerReset,
	X,
} from "lucide-react";
import {
	DashboardNotification,
	notificationPill,
	readDismissedIds,
	writeDismissedIds,
} from "./dashboard-utils";

type NotificationsProps = {
	notifications: DashboardNotification[];
};

const typeIcons = {
	"host-request": MailQuestion,
	"renter-confirmed": ShieldCheck,
	"renter-completed": TimerReset,
	"renter-cancelled": MinusCircle,
} as const;

const typeLabels: Record<DashboardNotification["type"], string> = {
	"host-request": "New request",
	"renter-confirmed": "Confirmed",
	"renter-completed": "Completed",
	"renter-cancelled": "Cancelled",
};

const relativeTime = (isoDate: string) => {
	const diffMs = Date.now() - new Date(isoDate).getTime();
	if (Number.isNaN(diffMs)) return "";

	const minutes = Math.floor(diffMs / 60_000);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes}m ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;

	const days = Math.floor(hours / 24);
	return `${days}d ago`;
};

const Notifications = ({ notifications }: NotificationsProps) => {
	const [dismissedIds, setDismissedIds] = useState<string[]>(readDismissedIds());

	const dismiss = (id: string) => {
		const next = [...dismissedIds, id];
		setDismissedIds(next);
		writeDismissedIds(next);
	};

	const visible = notifications.filter(
		(notification) => !dismissedIds.includes(notification.id),
	);

	return (
		<section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="flex items-center gap-2 text-base font-bold text-foreground">
					Notifications
					{visible.length > 0 && (
						<span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
							{visible.length}
						</span>
					)}
				</h2>
				{dismissedIds.length > 0 && (
					<button
						type="button"
						onClick={() => {
							setDismissedIds([]);
							writeDismissedIds([]);
						}}
						className="text-xs font-semibold text-muted-foreground transition hover:text-primary"
					>
						Restore dismissed
					</button>
				)}
			</div>

			{visible.length === 0 ? (
				<div className="rounded-xl bg-black/20 p-6 text-center ring-1 ring-white/10">
					<BellOff size={28} className="mx-auto text-primary/60" />
					<p className="mt-2 font-semibold text-foreground">
						Nothing new
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						You&apos;re all caught up — booking requests and status updates
						will appear here.
					</p>
				</div>
			) : (
				<ul className="max-h-72 space-y-2.5 overflow-y-auto pr-1">
					{visible.map((notification) => {
						const Icon = typeIcons[notification.type];

						return (
							<li
								key={notification.id}
								className="flex items-start gap-3 rounded-xl bg-black/20 p-3 ring-1 ring-white/10"
							>
								<span
									className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${notificationPill[notification.type]}`}
								>
									<Icon size={14} />
								</span>

								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2">
										<span
											className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${notificationPill[notification.type]}`}
										>
											{typeLabels[notification.type]}
										</span>
										<span className="text-[11px] text-muted-foreground">
											{relativeTime(notification.createdAt)}
										</span>
									</div>
									<p className="mt-1 text-sm text-foreground/90">
										{notification.message}
									</p>
								</div>

								<button
									type="button"
									onClick={() => dismiss(notification.id)}
									aria-label="Dismiss notification"
									className="shrink-0 rounded-lg p-1 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
								>
									<X size={14} />
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};

export default Notifications;
