import { Star } from "lucide-react";

type RatingStarsProps = {
	value: number;
	size?: number;
	className?: string;
};

const RatingStars = ({ value, size = 14, className = "" }: RatingStarsProps) => {
	return (
		<div className={`flex gap-0.5 ${className}`} aria-label={`${value} out of 5`}>
			{Array.from({ length: 5 }, (_, index) => (
				<Star
					key={index}
					size={size}
					className={
						index < Math.round(value)
							? "fill-primary text-primary"
							: "text-foreground/25"
					}
				/>
			))}
		</div>
	);
};

export default RatingStars;
