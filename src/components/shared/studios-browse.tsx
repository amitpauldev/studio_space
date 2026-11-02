"use client";

import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import StudioCard from "@/components/shared/studio-card";
import { Studio } from "@/type/studioType";

const sortOptions = [
	{ value: "rating", label: "Top Rated" },
	{ value: "price-asc", label: "Price: Low to High" },
	{ value: "price-desc", label: "Price: High to Low" },
	{ value: "name", label: "Name: A to Z" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const priceRange = [0, 20, 50, 100] as const;

type StudiosBrowseProps = {
	ratings: { _id?: string; rating: number }[];
	categoryTitle: string;
	description: string;
	studios: Studio[];
};

const StudiosBrowse = ({
	ratings,
	categoryTitle,
	description,
	studios,
}: StudiosBrowseProps) => {
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState<SortValue>("rating");
	const [maxPrice, setMaxPrice] = useState(0); // 0 = no limit

	const filteredStudios = useMemo(() => {
		let result = studios.filter((studio) => {
			const matchesQuery =
				query.trim() === "" ||
				studio.title.toLowerCase().includes(query.toLowerCase()) ||
				studio.location.toLowerCase().includes(query.toLowerCase());
			const matchesPrice = maxPrice === 0 || studio.hourlyRate <= maxPrice;
			return matchesQuery && matchesPrice;
		});

		switch (sort) {
			case "price-asc":
				result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
				break;
			case "price-desc":
				result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
				break;
			case "name":
				result = [...result].sort((a, b) => a.title.localeCompare(b.title));
				break;
			default:
				// result = [...result].sort((a, b) => b.rating - a.rating);
				result = [...result].sort((a, b) => {
					const aRating = ratings.find((r) => r._id === a._id)?.rating || 0;
					const bRating = ratings.find((r) => r._id === b._id)?.rating || 0;
					return bRating - aRating;
				});
		}

		return result;
	}, [studios, ratings, query, sort, maxPrice]);

	return (
		<div>
			{/* Heading */}
			<div className="mb-6 px-1">
				<h1 className="text-3xl md:text-4xl font-bold">{categoryTitle}</h1>
				<p className="mt-2 text-foreground/60">
					{description} — {filteredStudios.length} studio
					{filteredStudios.length !== 1 && "s"} found
				</p>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 px-1">
				{/* Search */}
				<div className="relative flex-1 min-w-0">
					<Search
						size={16}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none"
					/>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search by name or location..."
						className="w-full rounded-xl bg-white/5 ring-1 ring-white/10 px-10 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:ring-primary/60 transition-[box-shadow] duration-300"
					/>
				</div>

				{/* Price filter */}
				<div className="flex items-center gap-1.5 rounded-xl bg-white/5 ring-1 ring-white/10 px-2 py-1.5">
					<span className="pl-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
						Max $
					</span>
					{priceRange.map((price) => (
						<button
							key={price}
							type="button"
							onClick={() => setMaxPrice(price)}
							className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${
								maxPrice === price
									? "bg-primary text-primary-foreground"
									: "text-foreground/60 hover:text-foreground hover:bg-white/10"
							}`}
						>
							{price === 0 ? "Any" : price}
						</button>
					))}
				</div>

				{/* Sort */}
				<div className="flex sm:items-center gap-1.5 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2.5 sm:py-1.5">
					<SlidersHorizontal
						size={16}
						className="text-foreground/50 shrink-0"
					/>
					<select
						value={sort}
						onChange={(event) => setSort(event.target.value as SortValue)}
						aria-label="Sort studios"
						className="bg-transparent text-sm text-foreground outline-none cursor-pointer [&>option]:text-neutral-900 [&>option]:bg-white"
					>
						{sortOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Studios grid */}
			{filteredStudios.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{filteredStudios.map((studio) => (
						<StudioCard key={studio._id} studio={studio} view={false} />
					))}
				</div>
			) : (
				<div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-12 text-center">
					<p className="text-lg font-semibold">No studios found</p>
					<p className="mt-1 text-sm text-foreground/60">
						Try adjusting your search or filters to find more spaces.
					</p>
					<button
						type="button"
						onClick={() => {
							setQuery("");
							setMaxPrice(0);
						}}
						className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/80 transition-colors duration-300"
					>
						Clear filters
					</button>
				</div>
			)}
		</div>
	);
};

export default StudiosBrowse;
