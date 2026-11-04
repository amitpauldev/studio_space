import { Star } from "lucide-react";
import type { StudioReview } from "@/type/studioType";
import { formatDate } from "./demo-content";
import RatingStars from "./rating-stars";

type ReviewsSectionProps = {
	reviews: StudioReview[];
};

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
	const average =
		reviews.reduce((sum, review) => sum + review.rating, 0) /
		(reviews.length || 1);

	const distribution = [5, 4, 3, 2, 1].map((stars) => ({
		stars,
		count: reviews.filter((review) => review.rating === stars).length,
	}));

	return (
		<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
			<h2 className="text-xl font-bold md:text-2xl">Reviews</h2>

			{/* Summary */}
			<div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
				<div className="shrink-0 text-center sm:border-r sm:border-white/10 sm:pr-6">
					<p className="text-4xl font-bold text-primary">{average.toFixed(1)}</p>
					<RatingStars value={average} className="mt-1.5 justify-center" />
					<p className="mt-1 text-xs text-foreground/50">
						{reviews.length} review{reviews.length !== 1 && "s"}
					</p>
				</div>

				<div className="flex-1">
					{distribution.map(({ stars, count }) => (
						<div
							key={stars}
							className="flex items-center gap-2 text-xs text-foreground/60"
						>
							<span className="flex w-7 shrink-0 items-center gap-1">
								{stars}
								<Star size={10} className="shrink-0 fill-primary text-primary" />
							</span>
							<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
								<div
									className="h-full rounded-full bg-primary transition-all duration-500"
									style={{
										width: `${reviews.length ? (count / reviews.length) * 100 : 0}%`,
									}}
								/>
							</div>
							<span className="w-4 shrink-0 text-right">{count}</span>
						</div>
					))}
				</div>
			</div>

			{/* Review list */}
			<div className="mt-6 flex flex-col divide-y divide-white/10">
				{reviews.map((review) => (
					<article
						key={review.id}
						className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
								{review.name.split(" ")[0][0].toUpperCase()}
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-semibold">{review.name}</p>
								<p className="text-xs text-foreground/50">
									{formatDate(review.date)}
								</p>
							</div>
							<RatingStars value={review.rating} className="shrink-0" />
						</div>
						<p className="text-sm leading-relaxed text-foreground/70">
							{review.comment}
						</p>
					</article>
				))}
			</div>

			<p className="mt-2 text-center text-xs text-foreground/40">
				Sample reviews shown until the ratings service goes live.
			</p>
		</section>
	);
};

export default ReviewsSection;
