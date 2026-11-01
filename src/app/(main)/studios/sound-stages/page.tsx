import StudiosBrowse from "@/components/shared/studios-browse";
import { studios } from "@/lib/studios-data";

const SoundStagesPage = () => {
	return (
		<StudiosBrowse
			title="Sound Stages"
			description="Full-scale stages for film sets, commercials, and live showcases"
			studios={studios.filter((studio) => studio.category === "Sound Stage")}
		/>
	);
};

export default SoundStagesPage;
