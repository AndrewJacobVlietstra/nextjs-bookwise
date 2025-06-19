import { auth } from "@/lib/auth";
import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc } from "drizzle-orm";
import { imageKitUrlEndpoint } from "@/lib/constants";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

export default async function Home() {
	const session = await auth();

	const latestBooks = await db
		.select()
		.from(books)
		.limit(8)
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
			<BookOverview
				currentBook={latestBooks[0]}
				userId={session?.user?.id as string}
			/>

			<BookList books={latestBooks} className="mt-28" title="Latest Books" />
		</>
	);
}
