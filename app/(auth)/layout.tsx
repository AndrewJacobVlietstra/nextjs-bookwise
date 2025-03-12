import Image from "next/image";
import { ReactNode } from "react";

type AuthLayoutProps = {
	children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<main className="auth-container">
			<section className="auth-form">
				<div className="auth-box">
					<div className="flex flex-row gap-3">
						<Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
						<h1 className="text-2xl font-semibold text-white">BookWise</h1>
					</div>

					<div>{children}</div>
				</div>
			</section>

			<section className="auth-illustration">
				<Image
					className="object-cover"
					src="/images/auth-illustration.png"
					alt="auth background"
					fill
				/>
			</section>
		</main>
	);
}
