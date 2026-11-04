import type { StudioCategory } from "@/type/studioType";

const categoryColors: Record<StudioCategory, string> = {
	"photo-studio": "bg-primary text-primary-foreground",
	"film-stage": "bg-orange-600 text-white",
	"podcast-lounge": "bg-rose-500 text-white",
	"music-suite": "bg-secondary text-secondary-foreground",
	workshop: "bg-purple-600 text-white",
};

type StudioCardBadgeProps = {
	category: StudioCategory;
};

const StudioCardBadge = ({ category }: StudioCardBadgeProps) => {
	return (
		<span
			data-slot="studio-category-badge"
			className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
				categoryColors[category] || "bg-primary text-primary-foreground"
			}`}
		>
			{category.split("-").join(" ")}
		</span>
	);
};

export default StudioCardBadge;
