import BookList from "@/components/BookList";
import SignOutButton from "@/components/SignOutButton";
import { logout } from "@/lib/actions";
import { sampleBooks } from "@/lib/constants";

export default function MyProfilePage() {
	return (
		<>
			<form className="mb-10" action={logout}>
				<SignOutButton />
			</form>

			<BookList books={sampleBooks} title="Borrowed Books" />
		</>
	);
}
