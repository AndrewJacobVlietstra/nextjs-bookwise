import BookList from "@/components/BookList";
import SignOutButton from "@/components/SignOutButton";
import { sampleBooks } from "@/lib/constants";

export default function MyProfilePage() {
	return (
		<>
			<form className="mb-10">
				<SignOutButton />
			</form>

			<BookList books={sampleBooks} title="Borrowed Books" />
		</>
	);
}
