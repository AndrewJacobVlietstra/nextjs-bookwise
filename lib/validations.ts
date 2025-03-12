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
