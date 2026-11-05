import React from "react";

const CategoryLoading = () => {
	const line = (className: string) => (
		<span
			aria-hidden="true"
			className={`block animate-pulse rounded bg-white/5 ${className}`}
		/>
	);

	return (
		<div aria-busy="true" aria-live="polite">
			{/* Heading skeleton */}
			<div className="mb-6 px-1">
				{line("h-8 w-56 md:h-10")}
				{line("mt-2 h-4 w-48")}
			</div>

			{/* Filters skeleton */}
			<div className="mb-6 flex flex-col gap-3 px-1 sm:flex-row sm:items-center">
				<div
					aria-hidden="true"
					className="h-10 flex-1 animate-pulse rounded-xl bg-white/5 ring-1 ring-white/10"
				/>
				<div
					aria-hidden="true"
					className="h-10 w-full animate-pulse rounded-xl bg-white/5 ring-1 ring-white/10 sm:w-48"
				/>
				<div
					aria-hidden="true"
					className="h-10 w-full animate-pulse rounded-xl bg-white/5 ring-1 ring-white/10 sm:w-40"
				/>
			</div>

			{/* Studio-card grid skeleton */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
					>
						{/* Cover image + category badge */}
						<div
							aria-hidden="true"
							className="relative aspect-[4/3] animate-pulse bg-white/10"
						/>
						<div className="flex flex-col gap-2 p-4">
							<div
								className="flex items-center justify-between gap-2"
							>
								{line("h-5 w-3/5")}
								{line("h-4 w-10 shrink-0 rounded-full")}
							</div>
							{line("h-3 w-full")}
							{line("h-3 w-5/6")}
							{line("h-3 w-2/3")}
							<div className="mt-2 flex items-center justify-between border-t border-foreground/10 pt-3">
								{line("h-5 w-16")}
								<span
									aria-hidden="true"
									className="h-9 w-24 animate-pulse rounded-xl bg-primary/70"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryLoading;
