import React from "react";

const GlowEffects = () => {
	return (
		<div className="pointer-events-none">
			{/* Ambient glows */}
			<div className="fixed top-1/3 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
			<div className="fixed bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-secondary/20 blur-[100px]" />
		</div>
	);
};

export default GlowEffects;
