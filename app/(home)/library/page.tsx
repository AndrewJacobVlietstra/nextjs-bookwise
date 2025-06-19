import { asc } from "drizzle-orm";
import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { imageKitUrlEndpoint } from "@/lib/constants";
import LibraryBody from "@/components/LibraryBody";

export default async function LibraryPage() {
	const allBooks = await db
		.select()
		.from(books)
		.orderBy(asc(books.createdAt))
		.then((books) =>
			books.map((book) => ({
				...book,
				coverUrl: `${imageKitUrlEndpoint}${book.coverUrl}`,
				rating: +book.rating,
			}))
		);

	return <LibraryBody books={allBooks} />;
}
