import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const ArtWorkshopsPage = () => {
	return (
		<StudiosBrowse
			title="Art Workshops"
			description="Creative studios for painting, crafts, and hands-on maker sessions"
			studios={studios.filter((studio) => studio.category === "Workshop")}
		/>
	);
};

export default ArtWorkshopsPage;
