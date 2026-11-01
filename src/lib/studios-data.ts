import {
	Clapperboard,
	LayoutGrid,
	Mic,
	Music,
	Palette,
	Camera,
} from "lucide-react";

export type Studio = {
	id: number;
	name: string;
	description: string;
	image: string;
	category: string;
	pricePerHour: number;
	rating: number;
	location: string;
};

export const studioCategories = [
	{
		name: "Music Suites",
		slug: "musicsuites",
		category: "Recording",
	},
	{
		name: "Photo Studios",
		slug: "photo-studios",
		category: "Photography",
	},
	{
		name: "Podcast Rooms",
		slug: "podcast-rooms",
		category: "Podcast",
	},
	{
		name: "Art Workshops",
		slug: "artworkshops",
		category: "Workshop",
	},
	{
		name: "Sound Stages",
		slug: "sound-stages",
		category: "Sound Stage",
	},
] as const;

export type StudioCategory = (typeof studioCategories)[number];

export const studios: Studio[] = [
	// Music Suites (Recording)
	{
		id: 1,
		name: "Harmony Recording Studio",
		description:
			"Fully-treated live room and control room with high-end monitors, vintage mics, and an experienced in-house engineer.",
		image:
			"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
		category: "Recording",
		pricePerHour: 25,
		rating: 4.9,
		location: "Gulshan, Dhaka",
	},
	{
		id: 2,
		name: "Echo Mix Mastering Suite",
		description:
			"Dedicated mixing suite with hybrid analog-digital rig, calibrated monitoring, and same-day turnarounds.",
		image:
			"https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=800&q=80",
		category: "Recording",
		pricePerHour: 30,
		rating: 4.7,
		location: "Dhanmondi, Dhaka",
	},
	{
		id: 3,
		name: "Amped Live Session Studio",
		description:
			"Warehouse-style live room built for full-band sessions with natural reverb and multi-camera video capture.",
		image:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
		category: "Recording",
		pricePerHour: 35,
		rating: 5.0,
		location: "Mirpur, Dhaka",
	},
	// Photo Studios (Photography)
	{
		id: 4,
		name: "Lumen photography Studio",
		description:
			"Modern photo studio with cyc wall, softbox setups, changing room, and a live view tethering station.",
		image:
			"https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		category: "Photography",
		pricePerHour: 20,
		rating: 4.8,
		location: "Banani, Dhaka",
	},
	{
		id: 5,
		name: "Aperture Daylight Loft",
		description:
			"North-facing daylight loft with 6m windows, custom backdrops, and a rooftop terrace for golden hour.",
		image:
			"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
		category: "Photography",
		pricePerHour: 22,
		rating: 4.6,
		location: "Uttara, Dhaka",
	},
	// Podcast Rooms (Podcast)
	{
		id: 6,
		name: "Vocal Booth Podcast Space",
		description:
			"Dead-quiet vocal booth with multi-mic setups, remote guest tools, and 4K video capture for podcast shows.",
		image:
			"https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=800&q=80",
		category: "Podcast",
		pricePerHour: 15,
		rating: 4.8,
		location: "Uttara, Dhaka",
	},
	{
		id: 7,
		name: "Roundtable Podcast Lounge",
		description:
			"Cozy 4-seat roundtable lounge with warm acoustic treatment, in-ear mixing, and one-touch recording.",
		image:
			"https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=800&q=80",
		category: "Podcast",
		pricePerHour: 18,
		rating: 4.5,
		location: "Banani, Dhaka",
	},
	// Art Workshops (Workshop)
	{
		id: 8,
		name: "Palette Riverside Workshop",
		description:
			"Sun-soaked riverside atelier with easels, pottery wheels, and open shelving for every medium you bring.",
		image:
			"https://images.unsplash.com/photo-1597960194599-22929afc25b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		category: "Workshop",
		pricePerHour: 12,
		rating: 4.7,
		location: "Sabujbaghi, Dhaka",
	},
	{
		id: 9,
		name: "Makers Loft Workshop Space",
		description:
			"Industrial loft with CNC cutting, spray bay, and pin-up walls — ideal for craft workshops and small events.",
		image:
			"https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=800&q=80",
		category: "Workshop",
		pricePerHour: 20,
		rating: 4.4,
		location: "Mohakhali, Dhaka",
	},
	// Sound Stages (Sound Stage)
	{
		id: 10,
		name: "Cinema Craft Sound Stage",
		description:
			"Full-scale sound stage with cyclorama, lighting grid, and production offices for commercials and film shoots.",
		image:
			"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
		category: "Sound Stage",
		pricePerHour: 50,
		rating: 4.9,
		location: "Tejgaon, Dhaka",
	},
	{
		id: 11,
		name: "Apex Green Screen Stage",
		description:
			"Double-height green screen stage with motion control rig, make-up room, and on-site technical support.",
		image:
			"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
		category: "Sound Stage",
		pricePerHour: 65,
		rating: 4.8,
		location: "Mirpur, Dhaka",
	},
	{
		id: 12,
		name: "Nova Rehearsal Sound Stage",
		description:
			"Flexible black-box stage for rehearsals, showcases, and workshop shoots with motorized lighting bars.",
		image:
			"https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		category: "Sound Stage",
		pricePerHour: 40,
		rating: 4.6,
		location: "Mohakhali, Dhaka",
	},
];

export const studioMenuLinks = [
	{
		name: "All Studios",
		href: "/studios",
		icon: LayoutGrid,
		count: studios.length,
	},
	...studioCategories.map((category) => ({
		name: category.name,
		href: `/studios/${category.slug}`,
		icon:
			category.slug === "musicsuites"
				? Music
				: category.slug === "photo-studios"
					? Camera
					: category.slug === "podcast-rooms"
						? Mic
						: category.slug === "artworkshops"
							? Palette
							: Clapperboard,
		count: studios.filter((studio) => studio.category === category.category)
			.length,
	})),
];
