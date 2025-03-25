import { z } from "zod";

export const signUpSchema = z.object({
	fullName: z.string().min(3, "Full Name must at least have 3 characters."),
	email: z.string().email("Must be of type email."),
	password: z.string().min(8, "Password must at least have 8 characters."),
	universityId: z.coerce.number(),
	universityCard: z.string().nonempty("University Card is required."),
});

export const signInSchema = z.object({
	email: z.string().email("Must be of type email."),
	password: z.string().min(8, "Password must at least have 8 characters."),
});

export const bookSchema = z.object({
	id: z.coerce.number(),
	title: z.string().min(1).max(200),
	author: z.string().min(1).max(200),
	genre: z.string().min(1).max(80),
	rating: z.coerce.number(),
	totalCopies: z.coerce.number(),
	availableCopies: z.coerce.number(),
	description: z.string().min(1).max(2000),
	coverColor: z.string().min(1).max(500),
	coverUrl: z.string().min(1).max(500).url(),
	videoUrl: z.string().min(1).max(500).url(),
	summary: z.string().min(1).max(2000),
	isLoanedBook: z.boolean().optional(),
});

export const userSchema = z.object({
	fullName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	universityId: z.coerce.number(),
	universityCard: z.string().nonempty(),
});
