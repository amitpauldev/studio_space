import { Camera } from "lucide-react";

const GlobalLoading = () => {
	return (
		<main className="grid min-h-screen place-items-center bg-neutral-950 px-6">
			<div aria-live="polite" aria-busy="true" className="flex flex-col items-center gap-6">
				{/* Spinner with brand mark */}
				<div className="relative h-16 w-16">
					<span
						aria-hidden="true"
						className="block h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-primary"
					/>
					<Camera
						size={22}
						className="absolute inset-0 m-auto text-primary"
					/>
				</div>

				<div className="text-center">
					<p className="font-semibold text-foreground">
						Setting up the studio…
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Lighting, lenses, and everything in between.
					</p>
				</div>
			</div>
		</main>
	);
};

export default GlobalLoading;
