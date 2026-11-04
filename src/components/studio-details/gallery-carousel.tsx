"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, Images } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/thumbs";

type GalleryCarouselProps = {
	images: string[];
	title: string;
};

const GalleryCarousel = ({ images, title }: GalleryCarouselProps) => {
	const mainSwiperRef = useRef<SwiperClass | null>(null);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-2 sm:p-3">
			<div className="relative">
				<Swiper
					modules={[Autoplay, Thumbs]}
					autoplay={{
						delay: 4500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={600}
					loop
					thumbs={{
						swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					className="overflow-hidden rounded-xl"
				>
					{images.map((image, index) => (
						<SwiperSlide key={`${image}-${index}`}>
							<div className="relative aspect-[16/9]">
								<Image
									src={image}
									alt={`${title} — photo ${index + 1}`}
									fill
									priority={index === 0}
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 860px"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Prev / next arrows */}
				<button
					type="button"
					aria-label="Previous photo"
					onClick={() => mainSwiperRef.current?.slidePrev()}
					className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-primary"
				>
					<ChevronLeftIcon size={18} />
				</button>
				<button
					type="button"
					aria-label="Next photo"
					onClick={() => mainSwiperRef.current?.slideNext()}
					className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-primary"
				>
					<ChevronRightIcon size={18} />
				</button>

				{/* Photo counter */}
				<span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
					<Images size={12} />
					{activeIndex + 1} / {images.length}
				</span>
			</div>

			{/* Thumbnails */}
			<Swiper
				modules={[Thumbs]}
				onSwiper={setThumbsSwiper}
				loop
				slidesPerView={4}
				spaceBetween={8}
				watchSlidesProgress
				breakpoints={{ 640: { slidesPerView: 5 } }}
				className="mt-2 sm:mt-3"
			>
				{images.map((image, index) => (
					<SwiperSlide key={`${image}-thumb-${index}`}>
						<button
							type="button"
							aria-label={`Show photo ${index + 1}`}
							onClick={() => mainSwiperRef.current?.slideToLoop(index)}
							className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg transition-all duration-300 ${
								activeIndex === index
									? "ring-2 ring-primary"
									: "opacity-50 ring-1 ring-white/10 hover:opacity-90"
							}`}
						>
							<Image
								src={image}
								alt=""
								fill
								className="object-cover"
								sizes="140px"
							/>
						</button>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default GalleryCarousel;
