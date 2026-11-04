import {
	CalendarDays,
	DollarSign,
	MapPin,
	ShieldCheck,
	Tag,
	Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Studio } from "@/type/studioType";
import { formatDate } from "./demo-content";

type StudioSpecsProps = {
	studio: Studio;
};

type SpecItem = {
	icon: LucideIcon;
	label: string;
	value: string;
};

const StudioSpecs = ({ studio }: StudioSpecsProps) => {
	const specs: SpecItem[] = [
		{
			icon: DollarSign,
			label: "Hourly rate",
			value: `$${studio.hourlyRate} / hr`,
		},
		{
			icon: Users,
			label: "Max capacity",
			value: `${studio.maxCapacity} people`,
		},
		{
			icon: ShieldCheck,
			label: "Security deposit",
			value:
				studio.securityDeposit > 0
					? `$${studio.securityDeposit} (refundable)`
					: "No deposit",
		},
		{
			icon: Tag,
			label: "Category",
			value: studio.category.split("-").join(" "),
		},
		{
			icon: MapPin,
			label: "Location",
			value: studio.location,
		},
		{
			icon: CalendarDays,
			label: "Listed on",
			value: formatDate(studio.createdAt) ?? "—",
		},
	];

	return (
		<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
			<h2 className="text-xl font-bold md:text-2xl">Specifications</h2>
			<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{specs.map(({ icon: Icon, label, value }) => (
					<div
						key={label}
						className="flex items-start gap-3 rounded-xl bg-black/20 p-3 ring-1 ring-white/10"
					>
						<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
							<Icon size={16} />
						</span>
						<div className="min-w-0">
							<p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
								{label}
							</p>
							<p className="mt-0.5 truncate font-semibold capitalize">
								{value}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default StudioSpecs;
