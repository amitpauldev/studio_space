"use server";

import { revalidatePath } from "next/cache";

export async function revalidateStudioPaths(category: string) {
	revalidatePath("/");
	revalidatePath("/studios");
	revalidatePath(`/studios/${category}`);
}

export async function revalidateMyBookingsPaths() {
	revalidatePath("/my-bookings");
}
