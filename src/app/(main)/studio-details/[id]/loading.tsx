import React from "react";

const StudioDetailsLoading = () => {
	const line = (className: string) => (
		<span
			aria-hidden="true"
			className={`block animate-pulse rounded bg-white/5 ${className}`}
		/>
	);

	return (
		<main className="min-h-screen bg-neutral-950">
			<div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
				<div aria-busy="true" aria-live="polite" className="flex flex-col gap-6">
					{/* Header skeleton */}
					<header className="flex flex-col gap-2.5">
						<div className="flex flex-wrap items-center gap-2">
							<span
								aria-hidden="true"
								className="h-6 w-24 animate-pulse rounded-full bg-white/5"
							/>
							<span
								aria-hidden="true"
								className="h-6 w-20 animate-pulse rounded-full bg-white/5"
							/>
						</div>
						{line("h-9 w-2/3 max-w-md md:h-10")}
						<div className="flex items-center gap-4">
							{line("h-4 w-40")}
							{line("h-5 w-14 rounded-full")}
						</div>
					</header>

					<div className="flex flex-col gap-6 lg:flex-row">
						{/* Main column skeleton */}
						<div className="flex min-w-0 flex-1 flex-col gap-6">
							{/* Gallery */}
							<div
								aria-hidden="true"
								className="relative aspect-[16/9] animate-pulse overflow-hidden rounded-2xl bg-white/10"
							/>

							{/* Overview card */}
							<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
								{line("h-5 w-32 mb-4")}
								<div className="space-y-2.5">
									{line("h-3 w-full")}
									{line("h-3 w-full")}
									{line("h-3 w-11/12")}
									{line("h-3 w-2/3")}
								</div>
							</section>

							{/* Specs + Amenities */}
							<section className="grid gap-6 sm:grid-cols-2">
								{[0, 1].map((block) => (
									<div
										key={block}
										className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
									>
										{line("h-5 w-24 mb-4")}
										<div className="space-y-3">
											{[0, 1, 2].map((row) => (
												<div key={row} className="flex items-center justify-between">
													{line("h-3 w-24")}
													{line("h-3 w-16")}
												</div>
											))}
										</div>
									</div>
								))}
							</section>
						</div>

						{/* Sidebar skeleton */}
						<aside className="flex flex-col gap-4 lg:w-80 lg:shrink-0">
							{/* Booking card */}
							<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
								{line("h-6 w-32 mb-2")}
								{line("h-3 w-full mb-4")}
								{line("h-10 w-full")}
								<div className="mt-3">
									{line("h-3 w-3/4")}
								</div>
							</section>

							{/* Host card */}
							<section className="flex items-center gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
								<div
									aria-hidden="true"
									className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-white/10"
								/>
								<div className="flex-1 space-y-2">
									{line("h-4 w-3/4")}
									{line("h-3 w-1/2")}
								</div>
							</section>
						</aside>
					</div>
				</div>
			</div>
		</main>
	);
};

export default StudioDetailsLoading;
