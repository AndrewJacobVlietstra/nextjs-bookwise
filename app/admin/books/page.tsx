import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminBooksPage() {
	return (
		<section className="w-full rounded-2xl bg-white p-7">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h2 className="text-xl font-semibold">All Books</h2>
				<Button
					className="bg-primary-admin/90 hover:bg-primary-admin text-white"
					asChild
				>
					<Link href="/admin/books/new">+ Create a New Book</Link>
				</Button>
			</div>

			<div className="mt-7 w-full overflow-hidden">
				<p>Table</p>
			</div>
		</section>
	);
}
