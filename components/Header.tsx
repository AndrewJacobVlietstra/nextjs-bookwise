"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { cn, getInitials } from "@/lib/utils";

type HeaderProps = {
	session: Session;
};

export default function Header({ session }: HeaderProps) {
	const pathname = usePathname();

	const isMyProfilePath = pathname === "/my-profile";

	return (
		<header className="flex justify-between gap-x-16 my-10">
			<Link href="/">
				<Image
					src="/icons/logo.svg"
					alt="BookWise Logo"
					width={40}
					height={40}
				/>
			</Link>

			<ul className="flex flex-row items-center gap-8">
				<li>
					<Link
						href="/"
						className={cn("text-light-100 text-base cursor-pointer capitalize")}
					>
						Home
					</Link>
				</li>

				<li>
					<Link
						href="/library"
						className={cn("text-light-100 text-base cursor-pointer capitalize")}
					>
						Library
					</Link>
				</li>

				<li>
					<Link href="/my-profile">
						<Avatar>
							<AvatarFallback className="bg-amber-100/90 hover:bg-amber-100 transition-all">
								{getInitials(session.user?.name || "?")}
							</AvatarFallback>
						</Avatar>
					</Link>
				</li>
			</ul>
		</header>
	);
}
