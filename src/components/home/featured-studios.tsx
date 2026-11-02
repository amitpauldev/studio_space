import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import StudioCard from "@/components/shared/studio-card";
import { Studio } from "@/type/studioType";

const FeaturedStudios = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/featured-studios`,
		{
			next: { revalidate: 60 * 60 * 24 }, // Revalidate every day
		},
	);
	const studios = await res.json();

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
					{studios.map((studio: Studio) => (
						<CarouselItem
							key={studio._id}
							className="pl-2 basis-1/2 lg:basis-1/3"
						>
							<StudioCard studio={studio} view={true} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	);
};

export default FeaturedStudios;
