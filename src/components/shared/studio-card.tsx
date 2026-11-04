import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Studio, StudioCategory } from "@/type/studioType";

const categoryColors: Record<StudioCategory, string> = {
	"photo-studio": "bg-primary text-primary-foreground",
	"film-stage": "bg-orange-600 text-white",
	"podcast-lounge": "bg-rose-500 text-white",
	"music-suite": "bg-secondary text-secondary-foreground",
	workshop: "bg-purple-600 text-white",
};

const StudioCard = ({ studio }: { studio: Studio }) => {
	const { _id, title, category, location, hourlyRate, imageUrl, overview } =
		studio;

	const rating = 4.5;
	return (
		<Card className="rounded-2xl py-0 gap-0 border-none bg-white/5 ring-white/15 backdrop-blur-sm transition-[box-shadow,ring] duration-300 hover:ring-primary/60 hover:shadow-lg hover:shadow-primary/5">
			{/* Image with category badge */}
			<div className="relative aspect-[4/3]">
				<Image
					src={imageUrl}
					alt={`Image of ${title}`}
					fill
					className="object-cover"
					sizes="(max-width: 1024px) 50vw, 33vw"
				/>
				<span
					className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-medium ${
						categoryColors[category] || "bg-primary text-primary-foreground"
					}`}
				>
					{category}
				</span>
			</div>

			{/* Content */}
			<CardContent className="p-4 flex flex-col gap-2">
				<CardTitle className="flex items-center justify-between gap-2 text-lg font-bold text-foreground">
					<span className="truncate">{title}</span>
					{rating && (
						<span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
							<Star size={12} className="fill-primary" />
							{rating.toFixed(1)}
						</span>
					)}
				</CardTitle>

				{/* 2-line description */}
				<p className="text-sm text-foreground/70 line-clamp-2">{overview}</p>

				<p className="flex items-center gap-1.5 text-sm text-foreground/60 ">
					<MapPin size={14} />
					<span className="line-clamp-1">{location}</span>
				</p>

				<div className="flex items-center justify-between border-t border-foreground/10 pt-3 mt-2">
					<p className="text-primary font-bold">
						${hourlyRate}{" "}
						<span className="text-sm text-foreground/60 font-normal">/ hr</span>
					</p>
					<Link
						href={`/studio-details/${_id}`}
						className="px-3.5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/80 transition-colors duration-300"
					>
						View Details
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default StudioCard;
