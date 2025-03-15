import Header from "@/components/Header";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type HomeLayoutProps = {
	children: ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
	// If user not logged in and trying to access app, redirect to signin
	const session = await auth();
	if (!session) redirect("/signin");

	return (
		<main className="root-container">
			<div className="mx-auto max-w-7xl">
				<Header session={session} />

				<div className="mt-20 pb-20">{children}</div>
			</div>
		</main>
	);
}
