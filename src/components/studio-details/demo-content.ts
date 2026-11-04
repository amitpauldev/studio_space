import { Studio, StudioReview } from "@/type/studioType";

// There is no reviews/gallery endpoint yet — these helpers generate
// deterministic demo content for the UI until a backend is wired up.

// Demo rating in the 3.5 – 4.9 range, deterministic per studio id
export const getStudioRating = (id: string | undefined) => {
	const hash = [...(id ?? "")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
	return ((hash % 15) + 35) / 10;
};

// The API only exposes a single cover image, so pad the gallery
// with curated studio photos for the carousel demo.
const GALLERY_PHOTOS = [
	"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1600&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1600&auto=format&fit=crop",
];

export const buildGalleryImages = (studio: Studio): string[] =>
	[...new Set([studio.imageUrl, ...GALLERY_PHOTOS])];

const REVIEWER_NAMES = [
	"Alif Rahman",
	"Nusrat Jahan",
	"Tanvir Ahmed",
	"Farhana Islam",
	"Imran Hossain",
	"Sadia Chowdhury",
	"Rafiq Mahmud",
	"Lamia Karim",
];

const REVIEW_COMMENTS = [
	"Beautifully maintained space, the acoustic treatment is top notch. Booked again for next month, no question.",
	"Great location and easy check-in. The lighting setup alone is worth it — photos came out exactly how I imagined.",
	"Host was super responsive and flexible with timing. Equipment list is accurate, no surprises at all.",
	"Spacious, clean, and quiet. The monitoring speakers are well calibrated, mixing sessions felt effortless.",
	"Decent value for the price. wish the parking was a bit bigger, but the space itself delivered totally.",
	"Everything worked smoothly from booking to wrap-up. The session ran 30 minutes over and the host was kind about it.",
	"Ambience inside is inspiring — high ceilings, warm tones, and really comfortable gear. My team loved it.",
	"Solid studio for the rate. Some generators hum during extended takes, but the isolation booths are excellent.",
];

export const generateDemoReviews = (
	id: string | undefined,
	count = 4,
): StudioReview[] => {
	const seed = [...(id ?? "studio")].reduce(
		(acc, ch) => acc + ch.charCodeAt(0),
		0,
	);

	return Array.from({ length: count }, (_, index) => {
		const roll = seed + index * 37;
		return {
			id: `${id ?? "studio"}-review-${index + 1}`,
			name: REVIEWER_NAMES[roll % REVIEWER_NAMES.length],
			rating: [5, 4, 5, 4, 3, 5][roll % 6],
			comment: REVIEW_COMMENTS[roll % REVIEW_COMMENTS.length],
			date: new Date(Date.UTC(2026, roll % 11, (roll % 27) + 1)).toISOString(),
		};
	});
};

// Deterministic formatting (UTC) so server and client agree
export const formatDate = (iso?: string) =>
	iso
		? new Date(iso).toLocaleDateString("en-US", {
				day: "numeric",
				month: "short",
				year: "numeric",
				timeZone: "UTC",
			})
		: undefined;
