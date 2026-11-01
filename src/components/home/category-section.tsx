import React from "react";
import Link from "next/link";
import { Camera, Drama, Mic, Music, Palette } from "lucide-react";

const categories = [
	{
		name: "Photo Studios",
		slug: "photostudios",
		icon: Camera,
		color: "text-chart-1",
		bgColor: "bg-chart-1/15",
	},
	{
		name: "Sound Stages",
		slug: "soundstages",
		icon: Drama,
		color: "text-chart-2",
		bgColor: "bg-chart-2/15",
	},
	{
		name: "Podcast Rooms",
		slug: "podcastrooms",
		icon: Mic,
		color: "text-chart-5",
		bgColor: "bg-chart-3/15",
	},
	{
		name: "Music Suites",
		slug: "musicsuites",
		icon: Music,
		color: "text-chart-4",
		bgColor: "bg-chart-4/15",
	},
	{
		name: "Art Workshops",
		slug: "artworkshops",
		icon: Palette,
		color: "text-chart-5",
		bgColor: "bg-chart-5/15",
	},
];

const CategorySection = () => {
	return (
		<section className="mt-16">
			<h2 className="text-2xl md:text-3xl font-bold mb-6 px-1">
				Browse by Studio Categories
			</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
				{categories.map((category) => {
					const Icon = category.icon;
					return (
						<Link
							key={category.slug}
							href={`/studios/${category.slug}`}
							className="bg-white/5 px-4 py-6 ring-1 ring-white/15 rounded-xl flex flex-col items-center gap-2 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-primary/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
						>
							<Icon size={28} strokeWidth={1.5} className={category.color} />
							<h3 className="font-semibold text-sm text-center">
								{category.name}
							</h3>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default CategorySection;
