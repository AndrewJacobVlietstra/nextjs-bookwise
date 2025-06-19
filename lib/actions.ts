"use server";

import { books, borrowRecords, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn, signOut } from "./auth";
import { sleep } from "./utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ratelimit from "./ratelimit";
import dayjs from "dayjs";

export const signInWithCredentials = async (
	credentials: Pick<AuthCredentials, "email" | "password">
) => {
	const { email, password } = credentials;

	await sleep();

	const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
	const { success } = await ratelimit.limit(ip);

	if (!success) return redirect("/rate-limited");

	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return { success: false, message: `Signin Error: ${result.error}` };
		}

		return { success: true, message: "User signed in successfully." };
	} catch (error) {
		console.log(error, "Signin error.");
		return { success: false, message: "Signin error." };
	}
};

export const signUp = async (credentials: AuthCredentials) => {
	const { fullName, email, password, universityId, universityCard } =
		credentials;

	await sleep();

	const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
	const { success } = await ratelimit.limit(ip);

	if (!success) return redirect("/rate-limited");

	// Check if user exists
	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	// if user already exists return out of server action
	if (existingUser) {
		return { success: false, message: "User already exists." };
	}

	// If user does not already exist proceed with signup, hash password
	const hashedPassword = await hash(password, 10);

	try {
		await db.insert(users).values({
			fullName,
			email,
			password: hashedPassword,
			universityId,
			universityCard,
		});

		await signInWithCredentials({ email, password });

		return { success: true, message: "User successfully created." };
	} catch (error) {
		console.log(error, "Signup error.");
		return { success: false, message: "Signup error." };
	}
};

export async function logout() {
	await sleep();
	await signOut({ redirect: true, redirectTo: "/signin?logout=success" });
}

export const borrowBook = async (params: BorrowBookParams) => {
	const { bookId, userId } = params;

	try {
		// Get bookToBorrow and current user from db
		const [bookToBorrow] = await db
			.select()
			.from(books)
			.where(eq(books.id, bookId))
			.limit(1);

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);

		// Check if user is eligible to borrow book
		if (!user || user.status !== "APPROVED") {
			return {
				success: false,
				message:
					"User is not eligible to borrow book. Please contact an admin for approval.",
			};
		}

		// Check if book is available for borrowing
		if (!bookToBorrow || bookToBorrow.availableCopies <= 0) {
			return {
				success: false,
				message: "Book is not available for borrowing.",
			};
		}

		// Compute dueDate based on current day + 7 days
		const dueDate = dayjs().add(7, "day").toDate().toDateString();

		// Insert borrowRecord into table
		const [record] = await db
			.insert(borrowRecords)
			.values({ bookId, userId, dueDate })
			.returning();

		// Update the bookToBorrow's available copies
		await db
			.update(books)
			.set({ availableCopies: bookToBorrow.availableCopies - 1 })
			.where(eq(books.id, bookId));

		return {
			data: record,
			success: true,
			message: `${user.fullName.split(" ")[0]} borrowed ${
				bookToBorrow.title
			} successfully.`,
		};
	} catch (error) {
		console.log(error);

		return {
			success: false,
			message: "An error has occurred while trying to borrow book.",
		};
	}
};

export const returnBook = async (params: ReturnBookParams) => {
	try {
		// Get current date
		const returnDate = dayjs().format("YYYY-MM-DD");
		const { bookId, recordId } = params;

		// Update book record, return_date and status to RETURNED
		await db
			.update(borrowRecords)
			.set({ returnDate, status: "RETURNED" })
			.where(eq(borrowRecords.id, recordId));

		// Get bookToReturn
		const [bookToReturn] = await db
			.select()
			.from(books)
			.where(eq(books.id, bookId))
			.limit(1);

		// Update the returned book's available copies
		await db
			.update(books)
			.set({ availableCopies: bookToReturn.availableCopies + 1 })
			.where(eq(books.id, bookId));

		return {
			success: true,
			message: `Successfully returned ${bookToReturn.title}!`,
		};
	} catch (error) {
		console.log(error);

		return {
			success: false,
			message: "An error has occurred while trying to return book.",
		};
	}
};
