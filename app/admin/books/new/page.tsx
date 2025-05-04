import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNewBooksPage() {
	return (
		<>
			<Button className="back-btn" asChild>
				<Link href="/admin/books">Go Back</Link>
			</Button>

			<section className="w-full max-w-2xl">
				<p>Book Form</p>
			</section>
		</>
	);
}
