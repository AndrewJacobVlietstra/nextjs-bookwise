import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import BookCard from "./BookCard";

type BookListProps = {
	books: Book[];
	title: string;
	className?: string;
	clearSearch?: () => void;
	isProfilePage?: boolean;
};

export default function BookList({
	className,
	clearSearch,
	books,
	title,
	isProfilePage = false,
}: BookListProps) {
	if (books.length === 0 && isProfilePage)
		return (
			<section className={cn("text-center mt-10", className)}>
				<h2 className="font-bebas-neue text-4xl text-light-100">
					Start borrowing some books!
				</h2>
			</section>
		);

	if (books.length === 0 && !isProfilePage && clearSearch)
		return (
			<section
				className={cn(
					"flex flex-col gap-y-2 text-center mt-10 max-w-60 mx-auto",
					className
				)}
			>
				<h2 className="font-bebas-neue text-3xl text-light-100">
					No Results Found!
				</h2>

				<p className="text-white mb-2">
					We couldn't find any books matching your search.
				</p>

				<Button
					className="text-[1.4rem] tracking-wide font-bebas-neue uppercase p-5"
					onClick={clearSearch}
				>
					Clear Search
				</Button>
			</section>
		);

	return (
		<section className={cn("", className)}>
			<h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

			<ul className="book-list">
				{books.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</ul>
		</section>
	);
}
