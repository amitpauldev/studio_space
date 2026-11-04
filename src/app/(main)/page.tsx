import CategorySection from "@/components/home/category-section";
import FeaturedStudios from "@/components/home/featured-studios";
import HeroSection from "@/components/home/hero-down";
import HeroSlider from "@/components/home/hero-slider";
import HostGuarantee from "@/components/home/hostgurantee";
import HowItWorks from "@/components/home/how-It-works";
import GlowEffects from "@/components/shared/glow-effect";

export default function HomePage() {
	return (
		<main className="min-h-screen relative overflow-hidden bg-neutral-950">
			<section className="mx-auto max-w-7xl z-10">
				<GlowEffects />
				<HeroSlider />
				<HeroSection />
				<FeaturedStudios />
				<CategorySection />
				<HowItWorks />
				<HostGuarantee />
			</section>
		</main>
	);
}
