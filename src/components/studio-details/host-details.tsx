import { BadgeCheck, CalendarDays, Mail, MessageCircle } from "lucide-react";
import type { StudioHost } from "@/type/studioType";
import { formatDate } from "./demo-content";

type HostDetailsProps = {
	host: StudioHost;
	memberSince?: string;
};

const HostDetails = ({ host, memberSince }: HostDetailsProps) => {
	const initials =
		host.name
			.split(" ")
			.map((part) => part[0])
			.slice(0, 2)
			.join("")
			.toUpperCase() || "S";

	return (
		<section className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
			<h2 className="text-lg font-bold">Meet your host</h2>

			<div className="mt-4 flex items-center gap-3">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
					{initials}
				</div>
				<div className="min-w-0">
					<p className="flex items-center gap-1.5 truncate font-semibold">
						{host.name}
						<BadgeCheck size={16} className="shrink-0 text-primary" />
					</p>
					<p className="text-xs text-foreground/50">Verified host</p>
				</div>
			</div>

			<div className="mt-3 flex flex-col gap-2 text-sm text-foreground/60">
				<span className="flex min-w-0 items-center gap-2">
					<Mail size={14} className="shrink-0 text-primary" />
					<span className="truncate">{host.email}</span>
				</span>
				{formatDate(memberSince) && (
					<span className="flex items-center gap-2">
						<CalendarDays size={14} className="shrink-0 text-primary" />
						Joined {formatDate(memberSince)}
					</span>
				)}
			</div>

			<a
				href={`mailto:${host.email}`}
				className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-hover"
			>
				<MessageCircle size={16} />
				Message host
			</a>
		</section>
	);
};

export default HostDetails;
