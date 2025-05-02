"use client";

import Image from "next/image";
import Link from "next/link";
import { adminSideBarLinks } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

type SidebarProps = {
	session: Session;
};

export default function Sidebar({ session }: SidebarProps) {
	const pathname = usePathname();

	return (
		<div className="admin-sidebar">
			<div>
				<div className="logo">
					<Image
						src="/icons/admin/logo.svg"
						alt="logo"
						height={37}
						width={37}
					/>

					<h1>BookWise</h1>
				</div>

				<div className="flex flex-col mt-10 gap-5">
					{adminSideBarLinks.map(({ img, route, text }) => {
						const isSelected = route === pathname;

						return (
							<Link href={route} key={route}>
								<div
									className={cn(
										"link",
										isSelected && "bg-primary-admin shadow-sm"
									)}
								>
									<div className="relative size-5">
										<Image
											src={img}
											alt="link icon"
											fill
											className={`${
												isSelected ? "brightness-0 invert" : ""
											} object-contain`}
										/>
									</div>

									<p
										className={cn(isSelected ? "text-white" : "text-dark-500")}
									>
										{text}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>

			<div className="user">
				<Avatar>
					<AvatarFallback className="bg-amber-100">
						{getInitials(session.user?.name || "?")}
					</AvatarFallback>
				</Avatar>

				<div className="flex flex-col max-md:hidden">
					<p className="font-semibold text-dark-200">{session.user?.name}</p>
					<p className="text-light-500 text-xs">{session.user?.email}</p>
				</div>
			</div>
		</div>
	);
}
