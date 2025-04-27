import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";

type AdminLayoutProps = {
	children: ReactNode;
};

const AdminLayout = async ({ children }: AdminLayoutProps) => {
	const session = await auth();

	if (!session?.user?.id) redirect("/signin");

	return (
		<main className="flex flex-row min-h-screen w-full">
			<Sidebar session={session} />

			<div className="admin-container">
				<p>Header</p>
				{children}
			</div>
		</main>
	);
};

export default AdminLayout;
