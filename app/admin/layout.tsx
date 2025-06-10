import "@/styles/admin.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

type AdminLayoutProps = {
	children: ReactNode;
};

const AdminLayout = async ({ children }: AdminLayoutProps) => {
	const session = await auth();

	if (!session?.user?.id) redirect("/signin");

	// Check if current user is an admin
	const isAdmin = await db
		.select({ isAdmin: users.role })
		.from(users)
		.where(eq(users.id, session.user.id))
		.limit(1)
		.then((res) => res[0].isAdmin === "ADMIN");

	// If not admin redirect them out of admin dashboard
	if (!isAdmin) redirect("/");

	return (
		<main className="flex flex-row min-h-screen w-full">
			<Sidebar session={session} />

			<div className="admin-container">
				<Header session={session} />
				{children}
			</div>
		</main>
	);
};

export default AdminLayout;
