import { cn } from "@/lib/utils";
import ReturnBookButton from "./ReturnBookButton";
import BookCover from "./BookCover";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

type BookCardProps = {
	book: Book;
};

export default function BookCard({ book }: BookCardProps) {
	const {
		id,
		title,
		genre,
		borrowRecord,
		coverColor,
		coverUrl,
		isLoaned = false,
	} = book;

	// Get difference of due date compared to today in days
	const daysLeft = dayjs(borrowRecord?.dueDate).diff(
		dayjs().format("YYYY-MM-DD"),
		"day"
	);

	// Determine if book is late
	const isBookLate = daysLeft <= 0;

	return (
		<li className={cn(isLoaned && "xs:w-52 w-full")}>
			<Link
				href={`/books/${id}`}
				className={cn(isLoaned && "w-full flex flex-col items-center")}
			>
				<BookCover coverColor={coverColor} coverUrl={coverUrl} />

				<div className={cn("mt-4", !isLoaned && "xs:max-w-40 max-w-28")}>
					<p className="book-title">{title}</p>
					<p className="book-genre">{genre}</p>
				</div>
			</Link>

			{isLoaned && (
				<div className="mt-3 w-full">
					<div className="book-loaned">
						<Image
							className="object-contain"
							src="/icons/calendar.svg"
							alt="calendar"
							width={18}
							height={18}
						/>

						<p className="text-light-100">
							{isBookLate
								? "Book is late, return ASAP"
								: `${daysLeft} days
								left to return`}
						</p>
					</div>

					<ReturnBookButton bookId={id} recordId={borrowRecord?.id as string} />
				</div>
			)}
		</li>
	);
}
