import { MapPin, ShieldCheck, Star } from "lucide-react";
import type { Studio } from "@/type/studioType";
import StudioCardBadge from "./studio-category-badge";
import GalleryCarousel from "./gallery-carousel";
import DetailOverview from "./detail-overview";
import StudioSpecs from "./studio-specs";
import AmenitiesList from "./amenities-list";
import ReviewsSection from "./reviews-section";
import HostDetails from "./host-details";
import BookingCard from "./booking-card";
import RatingStars from "./rating-stars";
import {
	buildGalleryImages,
	generateDemoReviews,
	getStudioRating,
} from "./demo-content";

type StudioDetailsViewProps = {
	studio: Studio;
};

const StudioDetailsView = ({ studio }: StudioDetailsViewProps) => {
	const rating = getStudioRating(studio._id ?? studio.title);
	const galleryImages = buildGalleryImages(studio);
	const reviews = generateDemoReviews(studio._id ?? studio.title, 4);

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<header className="flex flex-col gap-2.5">
				<div className="flex flex-wrap items-center gap-2">
					<StudioCardBadge category={studio.category} />
					{studio.status === "approved" && (
						<span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
							<ShieldCheck size={12} />
							Approved
						</span>
					)}
				</div>

				<h1 className="text-3xl font-bold md:text-4xl">{studio.title}</h1>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/60">
					<span className="flex items-center gap-1.5">
						<MapPin size={14} className="shrink-0" />
						{studio.location}
					</span>
					<span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
						<Star size={12} className="fill-primary" />
						{rating.toFixed(1)}
					</span>
					<RatingStars value={rating} />
				</div>
			</header>

			<div className="flex flex-col gap-6 lg:flex-row">
				{/* Main column */}
				<div className="flex min-w-0 flex-1 flex-col gap-6">
					<GalleryCarousel images={galleryImages} title={studio.title} />
					<DetailOverview overview={studio.overview} />
					<StudioSpecs studio={studio} />
					<AmenitiesList amenities={studio.amenities} />
					<ReviewsSection reviews={reviews} />
				</div>

				{/* Sidebar */}
				<aside className="lg:w-80 lg:shrink-0">
					<div className="flex flex-col gap-4 lg:sticky lg:top-24">
						<BookingCard studio={studio} />
						<HostDetails
							host={studio.host}
							memberSince={studio.createdAt ?? studio.updatedAt}
						/>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default StudioDetailsView;
