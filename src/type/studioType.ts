export type StudioCategory =
	| "photo-studio"
	| "film-stage"
	| "podcast-lounge"
	| "music-suite"
	| "workshop"
	| "sound-stage"
	| "rehearsal-space";

export type StudioStatus = "pending" | "approved" | "rejected";

export interface StudioHost {
	name: string;
	email: string;
}

export interface Studio {
	_id?: string;
	title: string;
	category: StudioCategory;
	location: string;
	hourlyRate: number;
	maxCapacity: number;
	securityDeposit: number;
	amenities: string[];
	overview: string;
	imageUrl: string;
	host: StudioHost;
	status: StudioStatus;
	createdAt?: string;
	updatedAt?: string;
}

export interface CategoriesData {
	categoryTitle: string;
	categorySlug: string;
	description: string;
}
