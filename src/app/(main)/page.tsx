import CategorySection from "@/components/home/category-section";
import FeaturedStudios from "@/components/home/featured-studios";
import HeroSection from "@/components/home/hero-section";
import HostGuarantee from "@/components/home/hostgurantee";
import HowItWorks from "@/components/home/how-It-works";

export default function HomePage() {
	return (
		<main className="min-h-screen p-4 md:p-8">
			<section className="mx-auto max-w-7xl">
				<HeroSection />
				<FeaturedStudios />
				<CategorySection />
				<HowItWorks />
				<HostGuarantee />
			</section>
		</main>
	);
}
