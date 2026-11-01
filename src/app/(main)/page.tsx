import CategorySection from "@/components/home/category-section";
import FeaturedStudios from "@/components/home/featured-studios";
import HeroSection from "@/components/home/hero-section";
import HostGuarantee from "@/components/home/hostgurantee";
import HowItWorks from "@/components/home/how-It-works";

export default function HomePage() {
	return (
		<main className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-neutral-950">
			<section className="mx-auto max-w-7xl ">
				<HeroSection />
				<FeaturedStudios />
				<CategorySection />
				<HowItWorks />
				<HostGuarantee />
			</section>

			{/* Ambient glows */}
			<div className="fixed top-1/3 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
			<div className="fixed bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-secondary/20 blur-[100px]" />
		</main>
	);
}
