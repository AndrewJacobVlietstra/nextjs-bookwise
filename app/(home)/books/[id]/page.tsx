import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { imageKitUrlEndpoint } from "@/lib/constants";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/lib/auth";
import BookVideo from "@/components/BookVideo";

type BookOverviewPageProps = {
	params: Promise<{ id: string }>;
};

export default async function BookOverviewPage({
	params,
}: BookOverviewPageProps) {
	const session = await auth();
	const bookId = (await params).id;

	// Fetch book data based on id
	const [bookDetails] = await db
		.select()
		.from(books)
		.where(eq(books.id, bookId))
		.limit(1)
		.then((books) =>
			books.map((book) => ({
				...book,
				coverUrl: `${imageKitUrlEndpoint}${book.coverUrl}`,
				rating: +book.rating,
			}))
		);

	if (!bookDetails) redirect("/404");

	return (
		<>
			<BookOverview
				currentBook={bookDetails}
				userId={session?.user?.id as string}
			/>

			<div className="book-details">
				<div className="flex-[1.5]">
					<section className="flex flex-col gap-7">
						<h3>Summary</h3>

						<div className="space-y-5 text-xl text-light-100">
							{bookDetails.summary.split("\n").map((line, i) => (
								<p key={i}>{line}</p>
							))}
						</div>
					</section>

					<section className="mt-16 flex flex-col gap-7">
						<h3>Video</h3>

						<BookVideo videoUrl={bookDetails.videoUrl} />
					</section>
				</div>

				{/* Similar books component */}
			</div>
		</>
	);
}
