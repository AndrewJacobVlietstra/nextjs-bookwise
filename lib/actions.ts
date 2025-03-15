"use server";

import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "./auth";

export const signInWithCredentials = async (
	credentials: Pick<AuthCredentials, "email" | "password">
) => {
	const { email, password } = credentials;

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
