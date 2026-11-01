import StudiosMenu from "@/components/shared/studios-menu";

export default function StudiosLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
			<div className="flex flex-col lg:flex-row gap-6">
				{/* Sidebar menu */}
				<aside className="lg:w-64 lg:shrink-0">
					<div className="lg:sticky lg:top-24 flex flex-col gap-3">
						<h2 className="hidden lg:block text-sm font-semibold uppercase tracking-wider text-foreground/50 px-4">
							Browse Studios
						</h2>
						<StudiosMenu />
					</div>
				</aside>

				{/* Content panel */}
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</section>
	);
}
