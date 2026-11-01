import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Toaster } from "react-hot-toast";

const domine = Domine({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Studio Space",
	description:
		"Studio Space is a platform that connects musicians, artists, and creators with professional recording studios and creative spaces. Discover the perfect space for your next project and bring your vision to life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${domine.className} h-full antialiased`}>
			<body className="min-h-full">
				<Header />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
