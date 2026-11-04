"use client";

import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
	{
		id: 1,
		category: "YOUR CREATIVE JOURNEY STARTS HERE",
		title: "Find space.",
		highlight: "Create your story.",
		description:
			"Discover inspiring studios, creative spaces, and unique locations designed to bring your vision to life.",
		image: "/images/hero-slider-images/creative-workspace.webp",
		alt: "Modern creative workspace",
	},
	{
		id: 2,
		category: "MADE FOR YOUR NEXT BIG IDEA",
		title: "Where creative ideas",
		highlight: "come to life.",
		description:
			"From photography studios to recording spaces, discover the perfect environment for your next masterpiece.",
		image: "/images/hero-slider-images/music-recording-studio.webp",
		alt: "Professional music recording studio",
	},
	{
		id: 3,
		category: "TURN YOUR SPACE INTO OPPORTUNITY",
		title: "Your studio.",
		highlight: "Their inspiration.",
		description:
			"Share your creative space with a community of passionate creators and turn your studio into an opportunity.",
		image: "/images/hero-slider-images/interior-design.webp",
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
		<section className="relative rounded-b-3xl overflow-hidden ">
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
							{/*  Masked Wrapper Container */}
							<div
								className="absolute inset-0"
								style={{
									WebkitMaskImage:
										"linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
									maskImage:
										"linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, black 70%, transparent 100%)",
									WebkitMaskComposite: "source-in",
									maskComposite: "intersect",
								}}
							>
								{/* Background Image */}
								<div
									className="absolute inset-0 bg-cover bg-center"
									style={{ backgroundImage: `url(${slide.image})` }}
								/>

								{/* Gradient Overlays */}
								<div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

								{/* Glow Effects */}
								<div className="absolute top-1/3 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
								<div className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-secondary/20 blur-[100px]" />
							</div>

							{/* Content */}
							<div className="relative z-10 mx-auto w-full max-w-7xl py-24 px-4 md:px-8 lg:px-16">
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
											href="/add-new-studio"
											className="inline-flex h-12 items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-secondary hover:bg-secondary hover:text-black sm:h-14 sm:px-8 sm:text-base"
										>
											Host Your Space
										</Link>
									</div>

									{/* Trust indicator */}
									<div className="mt-10 flex items-center gap-3 text-sm text-white/50">
										<div className="flex -space-x-2">
											{[
												"/images/creators-images/Hiya.webp",
												"/images/creators-images/pass.webp",
												"/images/creators-images/teitel.jpg",
											].map((image) => (
												<div
													key={image}
													className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-[#332b27] text-xs font-semibold text-secondary"
												>
													<Image
														src={image}
														height={50}
														width={50}
														alt="icon"
													/>
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
