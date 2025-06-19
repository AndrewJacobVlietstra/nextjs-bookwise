"use client";

import { ChangeEvent, useRef, useState } from "react";
import BookList from "./BookList";

type LibraryBodyProps = {
	books: Book[];
};

export default function LibraryBody({ books }: LibraryBodyProps) {
	const [search, setSearch] = useState("");
	const [filteredBooks, setFilteredBooks] = useState(books || []);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleClearSearch = () => {
		setSearch("");
		setFilteredBooks(books);
		inputRef.current?.focus();
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSearch(inputValue);

		const filteredItems = books.filter((book) =>
			book.title.toLowerCase().includes(inputValue.toLowerCase())
		);
		setFilteredBooks(filteredItems);
	};

	return (
		<>
			<div className="flex flex-col gap-5 mx-auto max-w-[35rem] mb-8 text-center font-ibm-plex-sans">
				<p className="text-lg text-light-100 uppercase">
					Discover your next great read
				</p>

				<h2 className="text-5xl text-light-100 font-bold mt-[-0.25rem] mb-1">
					Explore and Search for <span className="text-primary">Any Book</span>{" "}
					In Our Library
				</h2>

				<input
					className="text-light-100 form-input font-sans rounded-lg px-6"
					placeholder="Search for a book..."
					type="text"
					ref={inputRef}
					value={search}
					onChange={(e) => handleSearchChange(e)}
				/>
			</div>

			<BookList
				books={filteredBooks}
				clearSearch={handleClearSearch}
				title="Library"
			/>
		</>
	);
}
