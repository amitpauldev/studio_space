"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send } from "lucide-react";
import { categories } from "@/components/home/category-section";
import { navLinks } from "./header";
import toast from "react-hot-toast";

/* Simple brand glyphs (this lucide version ships no brand icons except X) */
const InstagramIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="2" y="2" width="20" height="20" rx="5" />
		<circle cx="12" cy="12" r="4" />
		<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
	</svg>
);

const YoutubeIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="2" y="5" width="20" height="14" rx="4" />
		<path d="m10 9 5 3-5 3z" />
	</svg>
);

const Footer = () => {
	const [email, setEmail] = useState("");

	function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Please enter your email address");
			return;
		}
		toast.success("You're on the list! Welcome to StudioSpace.");
		setEmail("");
	}

	return (
		<footer className="mt-16 border-t border-white/10 bg-black/40 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
					{/* Brand */}
					<div className="flex flex-col gap-4">
						<Link href="/" className="w-40">
							<Image
								src="/images/logo-reverse.png"
								alt="StudioSpace logo"
								width={160}
								height={60}
							/>
						</Link>
						<p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
							Connecting musicians, artists, and creators with professional
							recording studios and creative spaces — so every great idea has
							a place to come to life.
						</p>
						{/* Social links */}
						<div className="flex items-center gap-2.5 mt-1">
							<a
								href="https://x.com"
								target="_blank"
								rel="noreferrer"
								aria-label="StudioSpace on X (formerly Twitter)"
								className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/15 flex items-center justify-center text-foreground/70 hover:bg-primary hover:ring-primary hover:text-white transition-all duration-300"
							>
								<X size={16} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noreferrer"
								aria-label="StudioSpace on Instagram"
								className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/15 flex items-center justify-center text-foreground/70 hover:bg-primary hover:ring-primary hover:text-white transition-all duration-300"
							>
								<InstagramIcon />
							</a>
							<a
								href="https://youtube.com"
								target="_blank"
								rel="noreferrer"
								aria-label="StudioSpace on YouTube"
								className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/15 flex items-center justify-center text-foreground/70 hover:bg-primary hover:ring-primary hover:text-white transition-all duration-300"
							>
								<YoutubeIcon />
							</a>
						</div>
					</div>

					{/* Quick links */}
					<div>
						<h3 className="font-semibold mb-4">Quick Links</h3>
						<ul className="flex flex-col gap-2.5 text-sm text-foreground/70">
							{navLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="hover:text-primary transition-colors duration-300"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Popular categories */}
					<div>
						<h3 className="font-semibold mb-4">Popular Categories</h3>
						<ul className="flex flex-col gap-2.5 text-sm text-foreground/70">
							{categories.map((category) => (
								<li key={category.slug}>
									<Link
										href={`/studios/${category.slug}`}
										className="hover:text-primary transition-colors duration-300"
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="font-semibold mb-4">Stay in the Loop</h3>
						<p className="text-sm text-foreground/70 leading-relaxed mb-4">
							New studios, member deals, and creative tips — straight to your
							inbox. No spam, ever.
						</p>
						<form onSubmit={handleSubscribe} className="flex gap-2">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="min-w-0 flex-1 rounded-xl bg-white/5 ring-1 ring-white/15 px-3 py-2 text-sm placeholder:text-foreground/40 outline-none focus:ring-primary/60 transition-shadow"
							/>
							<button
								type="submit"
								aria-label="Subscribe to newsletter"
								className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors duration-300 cursor-pointer"
							>
								<Send size={16} />
							</button>
						</form>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-foreground/60">
					<p>
						© {new Date().getFullYear()} StudioSpace. All rights reserved.
					</p>
					<div className="flex items-center gap-5">
						<Link
							href="/"
							className="hover:text-primary transition-colors duration-300"
						>
							Terms of Service
						</Link>
						<Link
							href="/"
							className="hover:text-primary transition-colors duration-300"
						>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
