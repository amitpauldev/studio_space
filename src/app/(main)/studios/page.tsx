import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const ExploreStudiosPage = () => {
	return (
		<StudiosBrowse
			title="All Studios"
			description="Browse professional recording, photography, podcast, and creative spaces"
			studios={studios}
		/>
	);
};

export default ExploreStudiosPage;
