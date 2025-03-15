import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/lib/constants";

export default async function Home() {
	return (
		<>
			<BookOverview currentBook={sampleBooks[0]} />

			<BookList className="mt-28" books={sampleBooks} title="Latest Books" />
		</>
	);
}
