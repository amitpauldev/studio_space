import { StudioCategory } from "@/type/studioType";

export const categoriesData = [
	{
		categoryTitle: "Photo Studios",
		categorySlug: "photo-studio",
		description: "Professional photography spaces.",
	},
	{
		categoryTitle: "Film Stages",
		categorySlug: "film-stage",
		description: "Professional film production spaces.",
	},
	{
		categoryTitle: "Podcast Lounges",
		categorySlug: "podcast-lounge",
		description: "Professional podcast recording spaces.",
	},
	{
		categoryTitle: "Music Suites",
		categorySlug: "music-suite",
		description: "Professional music recording spaces.",
	},
	{
		categoryTitle: "Workshops",
		categorySlug: "workshop",
		description: "Creative workshop spaces.",
	},
] as const satisfies {
	categoryTitle: string;
	categorySlug: StudioCategory;
	description: string;
}[];
