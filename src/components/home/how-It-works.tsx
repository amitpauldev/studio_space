import React from "react";
import Link from "next/link";
import { CalendarPlus, MessagesSquare, Camera, Rocket } from "lucide-react";

const steps = [
	{
		icon: CalendarPlus,
		title: "Browse & Book",
		description:
			"Explore studios and creative spaces by category, compare hourly rates, and pick a slot that fits your schedule.",
	},
	{
		icon: MessagesSquare,
		title: "Meet Your Host",
		description:
			"Message the studio host directly to discuss gear, setup, and anything special your session needs.",
	},
	{
		icon: Camera,
		title: "Create",
		description:
			"Show up, plug in, and get to work in a fully-equipped, quality-checked space made for your craft.",
	},
	{
		icon: Rocket,
		title: "Boost Your Reach",
		description:
			"Publish your work on your StudioSpace profile to get discovered and grow your audience.",
	},
];

const HowItWorks = () => {
	return (
		<section className="mt-16">
			{/* Heading */}
			<div className="text-center max-w-xl mx-auto">
				<h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
				<p className="mt-2 text-sm md:text-base text-foreground/70">
					From finding the right space to publishing what you make — four simple
					steps take you there.
				</p>
			</div>

			{/* Steps */}
			<div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Connector line (desktop only) */}
				<div className="hidden lg:block absolute top-10	left-[12.5%] right-[12.5%] h-px border-t border-dashed border-foreground/20" />

				{steps.map((step, index) => {
					const Icon = step.icon;
					return (
						<div
							key={step.title}
							className="relative flex flex-col items-center gap-3 text-center bg-white/5 ring-1 ring-white/15 rounded-2xl px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:ring-primary/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
						>
							{/* Step number */}
							<span className="absolute top-4 right-4 text-sm font-bold text-foreground/20">
								{String(index + 1).padStart(2, "0")}
							</span>

							<span className="relative z-10 flex w-14 h-14 rounded-full bg-primary/15 ring-1 ring-primary/30 items-center justify-center">
								<Icon size={24} className="text-primary" />
							</span>

							<h3 className="font-semibold">{step.title}</h3>
							<p className="text-sm text-foreground/70 leading-relaxed">
								{step.description}
							</p>
						</div>
					);
				})}
			</div>

			{/* CTA */}
			<div className="mt-8 flex justify-center">
				<Link
					href="/studios"
					className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/80 transition-colors duration-300"
				>
					Find Your Space
				</Link>
			</div>
		</section>
	);
};

export default HowItWorks;
