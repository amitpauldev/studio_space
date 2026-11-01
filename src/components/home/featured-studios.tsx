import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import StudioCard from "@/components/shared/studio-card";

export const featuredStudios = [
	{
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
		name: "Echo Mix Mastering Suite",
		description:
			"Dedicated mixing suite with hybrid analog-digital rig, calibrated monitoring, and same-day turnarounds.",
		image:
			"https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=800&q=80",
		category: "Mixing",
		pricePerHour: 30,
		rating: 4.7,
		location: "Dhanmondi, Dhaka",
	},
	{
		name: "Vocal Booth Podcast Space",
		description:
			"Dead-quiet vocal booth with multi-mic setups, remote guest tools, and 4K video capture for podcast shows.",
		image:
			"https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=800&q=80",
		category: "Podcast",
		pricePerHour: 20,
		rating: 4.8,
		location: "Uttara, Dhaka",
	},
	{
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
];

const FeaturedStudios = () => {
	return (
		<section className="mt-16">
			<Carousel opts={{ loop: true, align: "start" }}>
				{/* Heading + arrows */}
				<div className="flex items-center justify-between mb-6 px-1">
					<h2 className="text-2xl md:text-3xl font-bold">Featured Studios</h2>
					<div className="flex items-center gap-2">
						<CarouselPrevious className="static translate-none" />
						<CarouselNext className="static translate-none" />
					</div>
				</div>

				<CarouselContent className="-ml-2">
					{featuredStudios.map((studio) => (
						<CarouselItem
							key={studio.name}
							className="pl-2 basis-1/2 lg:basis-1/3"
						>
							<StudioCard {...studio} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	);
};

export default FeaturedStudios;
