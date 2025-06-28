import { auth } from "@/lib/auth";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { books, borrowRecords } from "@/database/schema";
import { imageKitUrlEndpoint } from "@/lib/constants";
import BookList from "@/components/BookList";
import SignOutButton from "@/components/SignOutButton";

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

			<div className="w-fit mb-8">
				<SignOutButton className="relative bottom-0 font-ibm-plex-sans font-semibold uppercase py-6 px-12 text-white bg-[#00d8ff]/60 hover:bg-[#00d8ff]/90 hover:text-dark-100 hover:bottom-[3px] active:bottom-0 transition-all" />
			</div>

			<BookList
				books={borrowedBooks}
				title="Borrowed Books"
				isProfilePage={true}
			/>
		</>
	);
}
