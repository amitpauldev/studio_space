import {
	Camera,
	Check,
	Coffee,
	Car,
	Wrench,
	Lightbulb,
	MapPin,
	Mic,
	MonitorPlay,
	Music,
	Presentation,
	Projector,
	Snowflake,
	Speaker,
	Plug,
	ShieldCheck,
	Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AmenitiesListProps = {
	amenities: string[];
};

// Map common amenity names to a relevant icon
const amenityIcons: Record<string, LucideIcon> = {
	wifi: Wifi,
	internet: Wifi,
	parking: Car,
	projector: Projector,
	microphone: Mic,
	mic: Mic,
	camera: Camera,
	coffee: Coffee,
	kitchen: Coffee,
	kitchenette: Coffee,
	security: ShieldCheck,
	speaker: Speaker,
	speakers: Speaker,
	lighting: Lightbulb,
	lights: Lightbulb,
	whiteboard: Presentation,
	"air conditioning": Snowflake,
	ac: Snowflake,
	climate: Snowflake,
	power: Plug,
	generator: Plug,
	instruments: Music,
	piano: Music,
	drums: Music,
	guitar: Music,
	technician: Wrench,
	engineering: Wrench,
	staff: Wrench,
	monitor: MonitorPlay,
	tv: MonitorPlay,
	screen: MonitorPlay,
	display: MonitorPlay,
};

const resolveAmenityIcon = (amenity: string): LucideIcon => {
	const key = amenity.toLowerCase().trim();
	if (amenityIcons[key]) return amenityIcons[key];

	for (const word of key.replace(/[^a-z ]/g, "").split(" ")) {
		if (amenityIcons[word]) return amenityIcons[word];
	}
	return Check;
};

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
	return (
		<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
			<h2 className="text-xl font-bold md:text-2xl">
				Amenities{" "}
				<span className="text-sm font-normal text-foreground/50">
					({amenities.length})
				</span>
			</h2>
			{amenities.length > 0 ? (
				<div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
					{amenities.map((amenity) => {
						const Icon = resolveAmenityIcon(amenity);
						return (
							<span
								key={amenity}
								className="flex items-center gap-2.5 rounded-xl bg-black/20 px-3 py-2.5 text-sm ring-1 ring-white/10"
							>
								<Icon size={16} className="shrink-0 text-primary" />
								<span className="truncate">{amenity}</span>
							</span>
						);
					})}
				</div>
			) : (
				<p className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
					<MapPin size={14} className="text-primary" /> No amenities listed yet
				</p>
			)}
		</section>
	);
};

export default AmenitiesList;
