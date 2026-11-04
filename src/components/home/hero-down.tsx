import React from "react";
import Link from "next/link";
import { Guitar, Headphones, Mic, Sparkles, Star, Play } from "lucide-react";

const HeroLeft = () => {
	return (
		<div className="flex-1 hidden lg:flex flex-col items-center md:items-start text-center md:text-left justify-center gap-6">
			{/* Brand title */}
			<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
				Studio<span className="text-primary">Space</span>
			</h1>
			<p className="text-white/80 max-w-md text-sm sm:text-base">
				Book professional recording studios, rehearsal rooms, and creative
				spaces designed for musicians, artists, and producers.
			</p>

			{/* CTA buttons */}
			<div className="flex flex-col sm:flex-row items-center gap-3">
				<Link
					href="/studios"
					className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300 cursor-pointer"
				>
					<Play size={16} />
					Watch Demo
				</Link>
			</div>

			{/* Trusted by */}
			<div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/70">
				<span>Trusted by leading artists:</span>
				<div className="flex items-center gap-1.5">
					<span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-white/80">
						<Mic size={14} />
					</span>
					<span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-white/80">
						<Guitar size={14} />
					</span>
					<span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-white/80">
						<Headphones size={14} />
					</span>
					<span className="text-xs text-white/60">+200 more</span>
				</div>
			</div>
		</div>
	);
};

const HeroRight = () => {
	return (
		<div className="flex-1 flex flex-col justify-center gap-5">
			{/* Badge */}
			<div className="flex items-center gap-2 self-start rounded-full bg-primary/20 ring-1 ring-primary/40 px-3.5 py-1.5 text-xs font-medium text-primary">
				<Sparkles size={14} />
				Premium Locations Available
			</div>

			{/* Brand title */}
			<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white md:hidden">
				Studio<span className="text-primary">Space</span>
			</h1>

			{/* Pitch */}
			<h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
				Discover Your Perfect Studio
			</h2>
			<p className="text-white/80 text-sm sm:text-base max-w-lg">
				Book fully-equipped recording studios, rehearsal rooms, and private
				production spaces across the city. Flexible hourly plans, instant
				confirmation.
			</p>

			{/* Stats */}
			<div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
				<div>
					<p className="text-primary text-2xl font-bold">50+</p>
					<p className="text-white/70 text-sm">Locations</p>
				</div>
				<div>
					<p className="text-primary text-2xl font-bold">2k+</p>
					<p className="text-white/70 text-sm">Happy Creators</p>
				</div>
				<div>
					<p className="flex items-center gap-1 text-primary text-2xl font-bold">
						4.9
						<Star size={18} className="fill-primary" />
					</p>
					<p className="text-white/70 text-sm">Rating</p>
				</div>
			</div>
		</div>
	);
};

const HeroSection = () => {
	return (
		<div className="px-4 md:px-8 lg:px-16">
			<div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xs">
				<div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-10 lg:p-16">
					<HeroLeft />
					<HeroRight />
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
