"use client";

import React from "react";
import Link from "next/link";
import { Domine } from "next/font/google";
import { Home, TriangleAlert } from "lucide-react";
import "./globals.css";

const domine = Domine({
	subsets: ["latin"],
});

const GlobalError = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<html lang="en" className={`${domine.className} h-full antialiased`}>
			<body className="min-h-full bg-neutral-950">
				<main className="grid min-h-screen place-items-center bg-neutral-950 px-6">
					<div className="w-full max-w-lg text-center text-foreground">
						{/* Icon */}
						<div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 shadow-xl shadow-black/20 ring-1 ring-white/10">
							<TriangleAlert className="h-10 w-10 text-primary" />
						</div>

						{/* Error Code */}
						<h1 className="text-8xl font-extrabold tracking-tighter text-primary">
							500
						</h1>

						{/* Message */}
						<h2 className="mt-4 text-2xl font-bold sm:text-3xl">
							Something went wrong!
						</h2>

						<p className="mt-4 leading-relaxed text-muted-foreground">
							An unexpected error cut the session short. Our crew is already
							on it — try again, or head back home and keep exploring
							studios.
						</p>

						{/* Anonymous error details */}
						{error?.digest && (
							<p className="mt-3 text-xs text-muted-foreground/60">
								Error code:{" "}
								<span className="font-mono text-muted-foreground">
									{error.digest}
								</span>
							</p>
						)}

						{/* Actions */}
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<button
								type="button"
								onClick={reset}
								className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover sm:w-auto"
							>
								<TriangleAlert size={16} /> Try Again
							</button>

							<Link
								href="/"
								className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 text-sm font-semibold text-foreground transition hover:bg-white/10 sm:w-auto"
							>
								<Home size={16} /> Back to Home
							</Link>
						</div>

						{/* Footer */}
						<p className="mt-12 text-sm text-muted-foreground">
							<span className="font-semibold text-foreground">
								StudioSpace
							</span>{" "}
							— Find your creative space.
						</p>
					</div>
				</main>
			</body>
		</html>
	);
};

export default GlobalError;
