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
	title: z.string().trim().min(2).max(100),
	description: z.string().trim().min(10).max(1500),
	author: z.string().trim().min(2).max(100),
	genre: z.string().trim().min(2).max(50),
	rating: z.number().min(1).max(5),
	totalCopies: z.coerce.number().int().positive().lte(10000),
	coverUrl: z.string().nonempty(),
	coverColor: z
		.string()
		.trim()
		.regex(/^#[0-9A-F]{6}$/i),
	videoUrl: z.string().nonempty(),
	summary: z.string().trim().min(10),
});

export const userSchema = z.object({
	fullName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	universityId: z.coerce.number(),
	universityCard: z.string().nonempty(),
});
