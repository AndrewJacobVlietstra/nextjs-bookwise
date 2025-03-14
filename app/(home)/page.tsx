import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sampleBooks } from "@/lib/constants";

export default async function Home() {
	const result = await db.select().from(users);
	console.log(result);

	return (
		<>
			<BookOverview currentBook={sampleBooks[0]} />

			<BookList className="mt-28" books={sampleBooks} title="Latest Books" />
		</>
	);
}
