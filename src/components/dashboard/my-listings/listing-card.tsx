import { MapPin, SquarePen, Trash2, Users } from "lucide-react";
import { Studio } from "@/type/studioType";
import {
	categoryPill,
	fallbackDot,
	fallbackPill,
	statusBadge,
	statusDot,
} from "./listing-styles";
import DeleteListingButton from "./delete-listing-btn";
import Link from "next/link";

const ListingCard = ({ listing }: { listing: Studio }) => {
	return (
		<article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20">
			<div className="relative aspect-[16/9] bg-white/10">
				<img
					src={listing.imageUrl}
					alt={`Image of ${listing.title}`}
					className="h-full w-full object-cover"
				/>
				<span
					className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 backdrop-blur-sm ${
						categoryPill[listing.category] ?? fallbackPill
					}`}
				>
					{listing.category.replace("-", " ")}
				</span>
				<span
					className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 backdrop-blur-sm ${
						statusBadge[listing.status] ?? fallbackPill
					}`}
				>
					<span
						className={`h-1.5 w-1.5 rounded-full ${
							statusDot[listing.status] ?? fallbackDot
						}`}
					/>
					{listing.status}
				</span>
			</div>

			<div className="space-y-2.5 p-4">
				<div>
					<h2 className="truncate font-bold text-foreground">
						{listing.title}
					</h2>
					<p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
						<MapPin size={14} className="shrink-0 text-primary/80" />
						<span className="truncate">{listing.location}</span>
					</p>
				</div>

				<div className="flex items-center gap-2">
					<span className="rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-extrabold text-primary ring-1 ring-primary/30">
						${listing.hourlyRate}
						<span className="text-xs font-normal">/hr</span>
					</span>
					<span className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-muted-foreground ring-1 ring-white/10">
						<Users size={14} /> {listing.maxCapacity}
					</span>
				</div>

				<div className="flex gap-2 border-t border-white/10 pt-3">
					<Link
						href={`my-listings/${listing._id}`}
						className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20"
					>
						<SquarePen size={14} /> Update
					</Link>
					<DeleteListingButton
						listingName={listing.title}
						listingId={listing._id}
						mobile={true}
					/>
				</div>
			</div>
		</article>
	);
};

export default ListingCard;
