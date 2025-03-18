import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/signin",
	},
	session: {
		maxAge: 86400, // 86400 seconds == 1 day,
		strategy: "jwt",
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const [user] = await db
					.select()
					.from(users)
					.where(eq(users.email, credentials.email.toString()))
					.limit(1);

				if (!user) return null;

				const isPasswordValid = await compare(
					credentials.password.toString(),
					user.password
				);

				if (!isPasswordValid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.fullName,
				} as User;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
			}

			return token;
		},
		async session({ token, session }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name;
			}

			return session;
		},
	},
});
