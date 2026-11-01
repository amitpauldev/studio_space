import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Camera } from "lucide-react";

export default function NotFound() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-background px-6">
			<div className="max-w-lg w-full text-center">
				{/* Icon */}
				<div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface">
					<Camera className="h-10 w-10 text-primary" />
				</div>

				{/* Error Code */}
				<h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-primary">
					404
				</h1>

				{/* Message */}
				<h2 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">
					Oops! Lost in space?
				</h2>

				<p className="mt-4 text-muted-foreground leading-relaxed">
					Looks like this page has gone out of focus. The studio you're looking
					for might have moved, been removed, or never existed.
				</p>

				{/* Actions */}
				<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
					<Button className="w-full sm:w-auto">
						<Link href="/" className="flex items-center">
							<Home className="mr-2 h-4 w-4" />
							Back to Home
						</Link>
					</Button>

					<Button variant="outline" className="w-full sm:w-auto">
						<Link href="/studios" className="flex items-center">
							<Search className="mr-2 h-4 w-4" />
							Explore Studios
						</Link>
					</Button>
				</div>

				{/* Footer */}
				<p className="mt-12 text-sm text-muted-foreground">
					<span className="font-semibold text-foreground">StudioSpace</span> —
					Find your creative space.
				</p>
			</div>
		</main>
	);
}
