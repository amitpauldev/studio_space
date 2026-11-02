"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
	{
		id: 1,
		category: "YOUR CREATIVE JOURNEY STARTS HERE",
		title: "Find your space.",
		highlight: "Create your story.",
		description:
			"Discover inspiring studios, creative spaces, and unique locations designed to bring your vision to life.",
		image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
		alt: "Modern creative workspace",
	},
	{
		id: 2,
		category: "MADE FOR YOUR NEXT BIG IDEA",
		title: "Where ideas",
		highlight: "come to life.",
		description:
			"From photography studios to recording spaces, discover the perfect environment for your next masterpiece.",
		image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
		alt: "Professional music recording studio",
	},
	{
		id: 3,
		category: "TURN YOUR SPACE INTO OPPORTUNITY",
		title: "Your studio.",
		highlight: "Their inspiration.",
		description:
			"Share your creative space with a community of passionate creators and turn your studio into an opportunity.",
		image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
		alt: "Beautiful creative studio interior",
	},
];

function SliderControls({ activeIndex }: { activeIndex: number }) {
	const swiper = useSwiper();

	return (
		<div className="flex items-center gap-4">
			{/* Navigation */}
			<div className="flex items-center gap-2">
				<button
					onClick={() => swiper.slidePrev()}
					aria-label="Previous slide"
					className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
				>
					<ArrowLeft size={18} />
				</button>

				<button
					onClick={() => swiper.slideNext()}
					aria-label="Next slide"
					className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-primary hover:bg-primary"
				>
					<ArrowRight size={18} />
				</button>
			</div>

			{/* Pagination */}
			<div className="flex items-center gap-2">
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						onClick={() => swiper.slideTo(index)}
						aria-label={`Go to slide ${index + 1}`}
						className={`h-1.5 rounded-full transition-all duration-300 ${
							activeIndex === index
								? "w-8 bg-primary"
								: "w-3 bg-white/30 hover:bg-white/60"
						}`}
					/>
				))}
			</div>
		</div>
	);
}

export default function HeroSlider() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="relative overflow-hidden ">
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				autoplay={{
					delay: 6000,
					disableOnInteraction: false,
				}}
				speed={1000}
				loop
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				className="hero-swiper"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative flex min-h-[650px] items-center sm:min-h-[700px] lg:min-h-[760px]">
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{
									backgroundImage: `url(${slide.image})`,
								}}
							/>

							{/* Image Overlay */}
							<div className="absolute inset-0 bg-black/50" />

							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

							{/* Content */}
							<div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
								<div className="max-w-3xl">
									{/* Category */}
									<div className="mb-6 flex items-center gap-3">
										<span className="h-px w-10 bg-primary" />

										<p className="text-xs font-semibold tracking-[0.25em] text-secondary sm:text-sm">
											{slide.category}
										</p>
									</div>

									{/* Heading */}
									<h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[#fff9f2] sm:text-6xl lg:text-7xl xl:text-8xl">
										{slide.title}

										<br />

										<span className="text-primary">{slide.highlight}</span>
									</h1>

									{/* Description */}
									<p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
										{slide.description}
									</p>

									{/* CTA Buttons */}
									<div className="mt-9 flex flex-wrap items-center gap-4">
										<Link
											href="/studios"
											className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover sm:h-14 sm:px-8 sm:text-base"
										>
											Explore Studios
											<ArrowUpRight
												size={18}
												className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
											/>
										</Link>

										<Link
											href="/studios"
											className="inline-flex h-12 items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-secondary hover:bg-secondary hover:text-black sm:h-14 sm:px-8 sm:text-base"
										>
											Host Your Space
										</Link>
									</div>

									{/* Trust indicator */}
									<div className="mt-10 flex items-center gap-3 text-sm text-white/50">
										<div className="flex -space-x-2">
											{["A", "B", "C"].map((letter) => (
												<div
													key={letter}
													className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#332b27] text-xs font-semibold text-secondary"
												>
													{letter}
												</div>
											))}
										</div>

										<p>Created for creators, by creators.</p>
									</div>
								</div>

								{/* Slide Number */}
								<div className="absolute bottom-8 right-6 hidden items-center gap-3 text-white/60 sm:flex lg:right-16">
									<span className="text-2xl font-semibold text-white">
										{String(slide.id).padStart(2, "0")}
									</span>

									<span className="h-px w-10 bg-white/30" />

									<span>03</span>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}

				{/* Custom Controls */}
				<div className="absolute bottom-8 left-6 z-20 sm:left-10 lg:left-16">
					<SliderControls activeIndex={activeIndex} />
				</div>
			</Swiper>
		</section>
	);
}
