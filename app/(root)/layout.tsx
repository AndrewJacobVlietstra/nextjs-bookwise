import Header from "@/components/Header";
import { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<main className="root-container">
			<div className="mx-auto max-w-7xl">
				<Header />

				<div className="mt-20 pb-20">{children}</div>
			</div>
		</main>
	);
}
