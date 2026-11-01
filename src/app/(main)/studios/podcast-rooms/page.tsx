import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const PodcastRoomsPage = () => {
	return (
		<StudiosBrowse
			title="Podcast Rooms"
			description="Dead-quiet booths and cozy lounges ready to hit record in minutes"
			studios={studios.filter((studio) => studio.category === "Podcast")}
		/>
	);
};

export default PodcastRoomsPage;
