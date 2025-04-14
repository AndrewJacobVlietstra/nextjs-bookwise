import Header from "@/components/Header";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

type HomeLayoutProps = {
	children: ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
	// If user not logged in and trying to access app, redirect to signin
	const session = await auth();
	if (!session) redirect("/signin");

	after(async () => {
		if (!session.user?.id) return;

		// Get currently signed in user from db
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, session.user.id))
			.limit(1);

		// If the user's last active date is today, stop here to reduce db mutations
		if (user.lastActivityDate === new Date().toISOString().slice(0, 10)) return;

		// Otherwise the user was not active today, update their last active date to today
		await db
			.update(users)
			.set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
			.where(eq(users.id, session.user.id));
	});

	return (
		<main className="root-container">
			<div className="mx-auto max-w-7xl">
				<Header session={session} />

				<div className="mt-20 pb-20">{children}</div>
			</div>
		</main>
	);
}
