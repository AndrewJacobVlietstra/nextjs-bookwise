import Image from "next/image";
import BookCover from "./BookCover";
import BorrowButton from "./BorrowButton";

type BookOverviewProps = {
	currentBook: Book;
	userId: string;
};

export default function BookOverview({
	currentBook,
	userId,
}: BookOverviewProps) {
	const {
		id: bookId,
		author,
		title,
		genre,
		rating,
		totalCopies,
		availableCopies,
		description,
		coverColor,
		coverUrl,
	} = currentBook;

	return (
		<section className="book-overview">
			<div className="flex flex-1 flex-col gap-5">
				<h1>{title}</h1>

				<div className="book-info">
					<p>
						By: <span className="font-semibold text-light-200">{author}</span>
					</p>

					<p>
						Category:{" "}
						<span className="font-semibold text-light-200">{genre}</span>
					</p>

					<div className="flex flex-row gap-1">
						<Image src="/icons/star.svg" alt="star" width={22} height={22} />
						<p>{rating}</p>
					</div>
				</div>

				<div className="book-copies">
					<p>
						Total Books: <span>{totalCopies}</span>
					</p>

					<p>
						Available Books: <span>{availableCopies}</span>
					</p>
				</div>

				<p className="book-description">{description}</p>

				<BorrowButton bookId={bookId} userId={userId} />
			</div>

			<div className="relative flex flex-1 justify-center">
				<div className="relative">
					<BookCover
						variant="wide"
						className="z-10"
						coverColor={coverColor}
						coverUrl={coverUrl}
					/>

					<div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
						<BookCover
							variant="wide"
							coverColor={coverColor}
							coverUrl={coverUrl}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
