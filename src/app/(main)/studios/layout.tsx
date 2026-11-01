export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div>
				<h1>Studios</h1>
			</div>
			{children}
		</section>
	);
}
