"use client";

import { cn, sleep } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Button } from "./ui/button";
import { returnBook } from "@/lib/actions";
import { toast } from "sonner";
import { toastVariants } from "@/lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ReturnBookButtonProps = {
	className?: ClassValue;
	bookId: string;
	recordId: string;
};

export default function ReturnBookButton({
	className,
	bookId,
	recordId,
}: ReturnBookButtonProps) {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleReturnBook = async () => {
		setIsPending(true);
		await sleep(500);

		const result = await returnBook({ bookId, recordId });
		const { message, success } = result;

		if (!success) {
			toast.error("Return Error!", {
				duration: 5000,
				description: message,
				style: toastVariants.destructive,
			});
		}

		if (success) {
			toast.success("Returned Successfully!", {
				duration: 5000,
				description: message,
				style: toastVariants.default,
			});

			router.refresh();
		}

		setIsPending(false);
	};

	return (
		<Button
			className={cn("book-btn", className)}
			disabled={isPending}
			onClick={handleReturnBook}
		>
			{isPending ? "Returning..." : "Return Book"}
		</Button>
	);
}
