import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";
import { cn } from "@/lib/utils";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
	extraSmall: "book-cover_extra_small",
	small: "book-cover_small",
	medium: "book-cover_medium",
	regular: "book-cover_regular",
	wide: "book-cover_wide",
};

type BookCoverProps = {
	className?: string;
	coverColor: string;
	coverUrl: string;
	variant?: BookCoverVariant;
};

export default function BookCover({
	className,
	coverColor = "#012B48",
	coverUrl = "https://placehold.co/400x600.png",
	variant = "regular",
}: BookCoverProps) {
	return (
		<div
			className={cn(
				"relative transition-all duration-300",
				variantStyles[variant],
				className
			)}
		>
			<BookCoverSvg coverColor={coverColor} />
			<div
				className="absolute z-10"
				style={{ left: "12%", width: "87.5%", height: "88%" }}
			>
				<Image
					alt="Book Cover"
					className="rounded-sm object-fill"
					src={coverUrl}
					fill
				/>
			</div>
		</div>
	);
}
