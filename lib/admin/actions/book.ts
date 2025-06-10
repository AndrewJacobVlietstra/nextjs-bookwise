"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (bookData: BookData) => {
	try {
		const newBook = await db
			.insert(books)
			.values({
				// stores floating point numbers as a string to preserve precision,
				// returns it as string as well when db is called
				...bookData,
				rating: bookData.rating.toString(),
				availableCopies: bookData.totalCopies,
			})
			.returning();

		return {
			success: true,
			message: "Book Created Successfully!",
			data: JSON.parse(JSON.stringify(newBook[0])) as Book,
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Error, something went wrong!",
			data: null,
		};
	}
};
