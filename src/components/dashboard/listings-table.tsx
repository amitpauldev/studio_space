import React from "react";
import { MapPin, SquarePen, Trash2, Users } from "lucide-react";
import { Studio } from "@/type/studioType";
import {
	categoryPill,
	fallbackDot,
	fallbackPill,
	statusBadge,
	statusDot,
} from "./listing-styles";

const ListingsTable = ({ listings }: { listings: Studio[] }) => {
	return (
		<div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 md:block">
			<table className="w-full text-left">
				<thead>
					<tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
						<th className="px-5 py-4 font-semibold">Studio</th>
						<th className="px-4 py-4 font-semibold">Location</th>
						<th className="px-4 py-4 font-semibold">Rate</th>
						<th className="px-4 py-4 font-semibold">Status</th>
						<th className="px-5 py-4 text-right font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{listings.map((listing) => (
						<tr
							key={listing._id}
							className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/5"
						>
							{/* Studio */}
							<td className="py-4 pl-5 pr-4">
								<div className="flex items-center gap-3.5">
									<img
										src={listing.imageUrl}
										alt={`Image of ${listing.title}`}
										className="h-14 w-20 shrink-0 rounded-xl bg-white/10 object-cover ring-1 ring-white/10"
									/>
									<div className="min-w-0 space-y-1">
										<p className="truncate font-semibold text-foreground">
											{listing.title}
										</p>
										<span
											className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ring-1 ${
												categoryPill[listing.category] ?? fallbackPill
											}`}
										>
											{listing.category.replace("-", " ")}
										</span>
									</div>
								</div>
							</td>

							{/* Location */}
							<td className="max-w-56 px-4 py-4">
								<p className="flex items-center gap-1.5 text-sm text-muted-foreground">
									<MapPin size={14} className="shrink-0 text-primary/80" />
									<span className="truncate">{listing.location}</span>
								</p>
							</td>

							{/* Rate */}
							<td className="px-4 py-4">
								<p className="text-lg font-extrabold text-primary">
									<span className="text-sm font-medium align-baseline">$</span>
									{listing.hourlyRate}
									<span className="text-xs font-normal text-muted-foreground">
										{" "}
										/hr
									</span>
								</p>
								<p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
									<Users size={12} /> up to {listing.maxCapacity} guests
								</p>
							</td>

							{/* Status */}
							<td className="px-4 py-4">
								<span
									className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold capitalize ring-1 ${
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
							</td>

							{/* Actions */}
							<td className="px-5 py-4">
								<div className="flex items-center justify-end gap-2">
									<button
										type="button"
										className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold text-primary transition hover:bg-primary/20"
									>
										<SquarePen size={13} /> Update
									</button>
									<button
										type="button"
										className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
									>
										<Trash2 size={13} /> Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListingsTable;
