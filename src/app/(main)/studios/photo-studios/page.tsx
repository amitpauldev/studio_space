import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const PhotoStudiosPage = () => {
	return (
		<StudiosBrowse
			title="Photo Studios"
			description="Daylight lofts and professional studios for portraits, products, and shoots"
			studios={studios.filter((studio) => studio.category === "Photography")}
		/>
	);
};

export default PhotoStudiosPage;
