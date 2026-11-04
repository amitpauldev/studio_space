const DetailOverview = ({ overview }: { overview: string }) => {
	return (
		<section className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
			<h2 className="text-xl font-bold md:text-2xl">About this studio</h2>
			<p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/70">
				{overview}
			</p>
		</section>
	);
};

export default DetailOverview;
