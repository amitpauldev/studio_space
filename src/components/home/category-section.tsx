import React from "react";
import Link from "next/link";
import { Camera, Drama, Mic, Music, Palette } from "lucide-react";

export const categories = [
	{
		name: "Photo Studios",
		slug: "photo-studio",
		icon: Camera,
		color: "text-chart-1",
		bgColor: "bg-chart-1/15",
	},
	{
		name: "Film Stages",
		slug: "film-stage",
		icon: Drama,
		color: "text-chart-2",
		bgColor: "bg-chart-2/15",
	},
	{
		name: "Podcast Lounges",
		slug: "podcast-lounge",
		icon: Mic,
		color: "text-chart-5",
		bgColor: "bg-chart-3/15",
	},
	{
		name: "Music Suites",
		slug: "music-suite",
		icon: Music,
		color: "text-chart-4",
		bgColor: "bg-chart-4/15",
	},
	{
		name: "Workshops",
		slug: "workshop",
		icon: Palette,
		color: "text-chart-5",
		bgColor: "bg-chart-5/15",
	},
];

const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => {
	const Icon = category.icon;
	return (
		<Link
			href={`/studios/${category.slug}`}
			className="bg-white/5 px-4 py-6 ring-1 ring-white/15 rounded-xl flex flex-col items-center gap-2 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-primary/60 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
		>
			<Icon size={28} strokeWidth={1.5} className={category.color} />
			<h3 className="font-semibold text-sm text-center">{category.name}</h3>
		</Link>
	);
};

const CategorySection = () => {
	return (
		<section className="mt-16 px-4 md:px-8 lg:px-16">
			<h2 className="text-2xl md:text-3xl font-bold mb-6 px-1">
				Browse by Studio Categories
			</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
				{categories.map((category) => (
					<CategoryCard key={category.slug} category={category} />
				))}
			</div>
		</section>
	);
};

export default CategorySection;
