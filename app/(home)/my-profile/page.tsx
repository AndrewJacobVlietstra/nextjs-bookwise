import BookList from "@/components/BookList";
import SignOutButton from "@/components/SignOutButton";
import { db } from "@/database/drizzle";
import { desc } from "drizzle-orm";
import { books } from "@/database/schema";
import { imageKitUrlEndpoint } from "@/lib/constants";

export default async function MyProfilePage() {
	const latestBooks = await db
		.select()
		.from(books)
		.limit(10)
		.orderBy(desc(books.createdAt))
		.then((books) =>
			books.map((book) => ({
				...book,
				coverUrl: `${imageKitUrlEndpoint}${book.coverUrl}`,
				rating: +book.rating,
			}))
		);
	return (
		<>
			<form className="mb-10">
				<SignOutButton />
			</form>

			<BookList books={latestBooks} title="Borrowed Books" />
		</>
	);
}
