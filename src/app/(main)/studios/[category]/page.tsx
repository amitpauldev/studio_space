import StudiosBrowse from "@/components/shared/studios-browse";
import { Studio } from "@/type/studioType";
import { notFound } from "next/navigation";
import { categoriesData } from "../../../../../public/data/categories";

const CategoryPage = async ({
	params,
}: {
	params: Promise<{ category: string }>;
}) => {
	const { category } = await params;

	const categoryData = categoriesData.find((c) => c.categorySlug === category);
	if (!categoryData) notFound();

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${category}`,
		{ next: { revalidate: 60 * 60 * 24 } }, // Revalidate every day
	);
	if (!res.ok) notFound();
	const studiosByCategory: Studio[] = (await res.json()) || [];

	const filteredStudiosByCategory = studiosByCategory.filter(
		(studio) => studio.category === category,
	);

	// Demo ratings for now — deterministic per studio id
	const demoRating = (id: string | undefined) => {
		const hash = [...(id ?? "")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
		return (hash % 5) + 1;
	};

	const ratings = filteredStudiosByCategory.map((studio) => ({
		_id: studio._id,
		rating: demoRating(studio._id),
	}));

	return (
		<StudiosBrowse
			categoryTitle={categoryData.categoryTitle}
			description={categoryData.description}
			studios={filteredStudiosByCategory}
			ratings={ratings}
		/>
	);
};

export default CategoryPage;
