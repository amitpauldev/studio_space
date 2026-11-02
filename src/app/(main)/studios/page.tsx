import StudiosBrowse from "@/components/shared/studios-browse";
import { Studio } from "@/type/studioType";

const ExploreStudiosPage = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios`, {
		next: { revalidate: 60 * 60 * 24 }, // Revalidate every day
	});
	const studios: Studio[] = await res.json();

	// Demo ratings for now — deterministic per studio id
	const demoRating = (id: string | undefined) => {
		const hash = [...(id ?? "")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
		return (hash % 5) + 1;
	};

	const ratings = studios.map((studio) => ({
		_id: studio._id,
		rating: demoRating(studio._id),
	}));

	return (
		<StudiosBrowse
			categoryTitle="All Studios"
			description="Browse professional recording, photography, podcast, and creative spaces"
			studios={studios}
			ratings={ratings}
		/>
	);
};

export default ExploreStudiosPage;
