import BookCard from "./BookCard";
import { cn } from "@/lib/utils";

type BookListProps = {
	books: Book[];
	className?: string;
	title: string;
};

export default function BookList({ className, books, title }: BookListProps) {
	if (books.length === 0)
		return (
			<section className={cn("text-center", className)}>
				<h2 className="font-bebas-neue text-4xl text-light-100">
					Start borrowing some books!
				</h2>
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
