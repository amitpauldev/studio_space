import StudioDetailsView from "@/components/studio-details/studio-details-view";
import type { Studio } from "@/type/studioType";
import { notFound } from "next/navigation";

const StudioDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/id/${id}`,
		{ next: { revalidate: 7 * 60 * 60 * 24 } }, // Revalidate every 7 day
	);
	if (!res.ok) notFound();

	const studio: Studio = await res.json();
	if (!studio || !studio.title) notFound();

	return (
		<main className="min-h-screen bg-neutral-950">
			<div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
				<StudioDetailsView studio={studio} />
			</div>
		</main>
	);
};

export default StudioDetailsPage;
