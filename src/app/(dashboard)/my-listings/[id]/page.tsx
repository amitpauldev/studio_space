import UpdateListingForm from "@/components/dashboard/update-listing/update-listing-form";
import type { Studio } from "@/type/studioType";
import { notFound } from "next/navigation";

const UpdateListingPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/id/${id}`,
		{ cache: "no-store" },
	);
	if (!res.ok) notFound();

	const studio: Studio = await res.json();
	if (!studio || !studio._id) notFound();

	return <UpdateListingForm studio={studio} />;
};

export default UpdateListingPage;
