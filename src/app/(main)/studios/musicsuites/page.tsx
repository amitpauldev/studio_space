import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const MusicSuitesPage = () => {
	return (
		<StudiosBrowse
			title="Music Suites"
			description="Recording, mixing, and live-session rooms built for artists and producers"
			studios={studios.filter((studio) => studio.category === "Recording")}
		/>
	);
};

export default MusicSuitesPage;
