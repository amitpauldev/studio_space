import React from "react";
import Link from "next/link";
import {
	ShieldCheck,
	UserRoundCheck,
	CaseSensitive,
	Headset,
	ArrowRight,
} from "lucide-react";

const guarantees = [
	{
		icon: ShieldCheck,
		title: "Liability Protection",
		description:
			"Every booking is covered by damage and liability protection up to $10,000 — gear, spaces, and people included.",
	},
	{
		icon: UserRoundCheck,
		title: "Verified Profiles",
		description:
			"Hosts and studios pass ID verification, badge checks, and regular quality reviews before going live.",
	},
	{
		icon: CaseSensitive,
		title: "Equipment Safety",
		description:
			"Insured, professionally maintained equipment with clear usage rules and replacement guarantees.",
	},
	{
		icon: Headset,
		title: "24/7 Host Support",
		description:
			"Real humans on call around the clock — for booking help, disputes, or day-of emergencies.",
	},
];

const HostGuarantee = () => {
	return (
		<section className="mt-16 px-4 md:px-8 lg:px-16">
			<div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.04] px-6 py-10 md:px-10 md:py-12">
				{/* Heading */}
				<div className="max-w-xl">
					<span className="inline-flex items-center gap-2 rounded-full bg-primary/15 ring-1 ring-primary/40 px-3.5 py-1.5 text-xs font-medium text-primary">
						<ShieldCheck size={14} />
						Host Guarantee &amp; Creator Support
					</span>
					<h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">
						Book with confidence, create without worry
					</h2>
					<p className="mt-2 text-sm md:text-base text-foreground/70">
						Every studio on StudioSpace is backed by a promise — your space,
						your gear, and your session are protected from booking to wrap.
					</p>
				</div>

				{/* Guarantee cards */}
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{guarantees.map((item) => {
						const Icon = item.icon;
						return (
							<div
								key={item.title}
								className="flex flex-col gap-3 rounded-2xl bg-white/5 ring-1 ring-white/15 p-5 transition-all duration-300 hover:ring-primary/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
							>
								<span className="flex w-10 h-10 rounded-xl bg-primary/15 ring-1 ring-primary/30 items-center justify-center">
									<Icon size={20} className="text-primary" />
								</span>
								<h3 className="font-semibold">{item.title}</h3>
								<p className="text-sm text-foreground/70 leading-relaxed">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>

				{/* Footer link */}
				<Link
					href="/studios"
					className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
				>
					Learn how bookings are protected
					<ArrowRight size={16} />
				</Link>
			</div>
		</section>
	);
};

export default HostGuarantee;
