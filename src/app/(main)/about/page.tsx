import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Album,
	ArrowRight,
	Award,
	Code2,
	GraduationCap,
	Handshake,
	MapPin,
	Quote,
	Radio,
	ShieldCheck,
	Sparkles,
	Target,
	Users,
} from "lucide-react";

/* Owned by the site owner — update these details in one place */
const founder = {
	name: "Amit Paul",
	photo: "/images/my-photo.png",
	role: "Founder & Developer, StudioSpace",
	bio: "I'm Amit Paul, a passionate web developer and a student at Jahangirnagar University. StudioSpace was created from my interest in combining technology, creativity, and practical problem-solving. My vision is to make creative spaces easier to discover and accessible to creators, while helping studio owners connect with people who need their spaces.",
	location: "Gazipur, Bangladesh",
};

const stats = [
	{ value: "35+", label: "Studios & Spaces" },
	{ value: "5", label: "Creative Categories" },
	{ value: "24/7", label: "Booking & Support" },
	{ value: "$10k", label: "Booking Protection" },
];

const purposes = [
	{
		icon: Target,
		title: "One Platform, Every Creative Space",
		description:
			"From recording suites and photo studios to podcast rooms, art workshops, and sound stages — find every kind of space under one roof, with clear pricing and real photos.",
	},
	{
		icon: Handshake,
		title: "Trust, Built In",
		description:
			"Verified hosts, ID-checked profiles, and damage protection up to $10,000 mean you can focus on the work — not on what happens behind the booking.",
	},
	{
		icon: Users,
		title: "Community Over Transactions",
		description:
			"Studio Space is built to connect creators with the people who own and run the spaces — direct messaging, honest reviews, and profiles that put your work first.",
	},
];

const audiences = [
	{
		icon: Radio,
		title: "For Creators",
		points: [
			"Search studios by category, price, and rating",
			"Compare hourly rates before you commit",
			"Book a space and get confirmed in minutes",
		],
	},
	{
		icon: Album,
		title: "For Studio Owners",
		points: [
			"List your space with a fully-managed profile",
			"Reach creators actively looking to book",
			"Host with confidence under the Studio Space guarantee",
		],
	},
];

const About = () => {
	return (
		<main className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-neutral-950">
			<section className="mx-auto max-w-7xl z-10">
				{/* Hero — purpose of the website */}
				<div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.04] px-6 py-12 md:px-10 md:py-16">
					<div className="max-w-2xl">
						<span className="inline-flex items-center gap-2 rounded-full bg-primary/15 ring-1 ring-primary/40 px-3.5 py-1.5 text-xs font-medium text-primary">
							<Sparkles size={14} />
							Our Story
						</span>
						<h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
							A home for every creative idea
						</h1>
						<p className="mt-4 text-foreground/70 leading-relaxed">
							<strong className="text-foreground">
								Studio Space is a platform that connects musicians, artists, and
								creators with professional recording studios and creative
								spaces.
							</strong>{" "}
							We believe great work deserves a great room — and that finding one
							should take minutes, not weeks of phone calls and dead-end
							listings.
						</p>

						{/* Stats */}
						<div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl bg-white/5 ring-1 ring-white/15 px-4 py-3.5 backdrop-blur-sm"
								>
									<p className="text-xl md:text-2xl font-bold text-primary">
										{stat.value}
									</p>
									<p className="mt-0.5 text-xs text-foreground/60">
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Decorative glow */}
					<div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
				</div>

				{/* What Studio Space stands for */}
				<div className="mt-16">
					<div className="max-w-xl">
						<h2 className="text-2xl md:text-3xl font-bold">
							Why Studio Space exists
						</h2>
						<p className="mt-2 text-sm md:text-base text-foreground/70">
							Every booking on our platform is guided by three simple
							principles.
						</p>
					</div>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
						{purposes.map((item) => {
							const Icon = item.icon;
							return (
								<div
									key={item.title}
									className="flex flex-col gap-3 rounded-2xl bg-white/5 ring-1 ring-white/15 p-6 transition-all duration-300 hover:ring-primary/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
								>
									<span className="flex w-11 h-11 rounded-xl bg-primary/15 ring-1 ring-primary/30 items-center justify-center">
										<Icon size={22} className="text-primary" />
									</span>
									<h3 className="font-semibold text-lg">{item.title}</h3>
									<p className="text-sm text-foreground/70 leading-relaxed">
										{item.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Who it is for */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
					{audiences.map((audience) => {
						const Icon = audience.icon;
						return (
							<div
								key={audience.title}
								className="rounded-2xl bg-white/5 ring-1 ring-white/15 p-6 md:p-8 transition-all duration-300 hover:ring-primary/60"
							>
								<div className="flex items-center gap-3">
									<span className="flex w-10 h-10 rounded-xl bg-primary/15 ring-1 ring-primary/30 items-center justify-center">
										<Icon size={20} className="text-primary" />
									</span>
									<h3 className="font-semibold">{audience.title}</h3>
								</div>
								<ul className="mt-5 flex flex-col gap-3 text-sm text-foreground/70">
									{audience.points.map((point) => (
										<li key={point} className="flex items-start gap-2.5">
											<span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
											{point}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>

				{/* Founder section */}
				<div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 md:p-10">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-8">
						{/* Photo */}
						<div className="relative shrink-0">
							<div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl -m-3" />
							<div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full ring-2 ring-primary/60 p-1.5 bg-gradient-to-br from-primary/40 to-transparent">
								<Image
									src={founder.photo}
									alt={founder.name}
									width={208}
									height={208}
									className="w-full h-full rounded-full object-cover"
									priority
								/>
							</div>
							<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-primary/30">
								<Award size={12} />
								Built with care
							</span>
						</div>

						{/* Bio */}
						<div className="flex-1 min-w-0 text-center md:text-left">
							<Quote
								className="mx-auto md:mx-0 text-primary/60 mb-3"
								size={28}
							/>
							<p className="text-lg md:text-xl leading-relaxed text-foreground/85">
								{founder.bio}
							</p>

							<div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
								<div>
									<p className="font-bold text-lg leading-tight">
										{founder.name}
									</p>
									<p className="text-sm text-primary">{founder.role}</p>
								</div>
							</div>

							{/* Quick facts */}
							<div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/15 px-3 py-1.5 text-xs text-foreground/70">
									<MapPin size={12} className="text-primary" />
									{founder.location}
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/15 px-3 py-1.5 text-xs text-foreground/70">
									<Code2 size={12} className="text-primary" />
									Designed &amp; developed end-to-end
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/15 px-3 py-1.5 text-xs text-foreground/70">
									<GraduationCap size={12} className="text-primary" />
									Programming Hero — Assignment 8
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="mt-16 flex flex-col items-center text-center">
					<ShieldCheck className="text-primary mb-3" size={28} />
					<h2 className="text-2xl md:text-3xl font-bold">
						Your next session starts here
					</h2>
					<p className="mt-2 max-w-md text-sm md:text-base text-foreground/70">
						Browse verified studios across five creative categories and book
						your space in minutes.
					</p>
					<Link
						href="/studios"
						className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/80 transition-colors duration-300"
					>
						Explore All Studios <ArrowRight size={16} />
					</Link>
				</div>
			</section>
		</main>
	);
};

export default About;
