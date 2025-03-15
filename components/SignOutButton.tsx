"use client";

import { logout } from "@/lib/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

type SignOutButtonProps = {
	className?: ClassValue;
};

export default function SignOutButton({ className }: SignOutButtonProps) {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			className={cn("", className)}
			disabled={isPending}
			onClick={() => startTransition(async () => await logout())}
		>
			{isPending ? "Signing Out..." : "Sign Out"}
		</Button>
	);
}
