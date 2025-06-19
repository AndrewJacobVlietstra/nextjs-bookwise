import { auth } from "@/lib/auth";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { books, borrowRecords } from "@/database/schema";
import { imageKitUrlEndpoint } from "@/lib/constants";
import BookList from "@/components/BookList";

export default async function MyProfilePage() {
	const session = await auth();

	const userBorrowRecords = await db
		.select()
		.from(borrowRecords)
		.where(eq(borrowRecords.userId, session?.user?.id as string))
		.innerJoin(books, eq(books.id, borrowRecords.bookId));

	const borrowedBooks = userBorrowRecords
		.map((record) => {
			if (record.borrow_records.status === "BORROWED") {
				return {
					...record.books,
					borrowRecord: { ...record.borrow_records },
					coverUrl: `${imageKitUrlEndpoint}${record.books.coverUrl}`,
					rating: +record.books.rating,
					isLoaned: true,
				};
			}

			return null;
		})
		.filter((book) => book !== null);

	return (
		<>
			<p className="mb-8 text-2xl text-light-400">
				<span className="font-bold text-primary">
					{session?.user?.name?.split(" ")[0]}
				</span>
				, here are all your borrowed books, they can be returned at any time.
			</p>

			<BookList
				books={borrowedBooks}
				title="Borrowed Books"
				isProfilePage={true}
			/>
		</>
	);
}
