import "@/styles/admin.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

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
				<Header session={session} />
				{children}
			</div>
		</main>
	);
};

export default AdminLayout;
