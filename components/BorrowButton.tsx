"use client";

import { borrowBook } from "@/lib/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { toastVariants } from "@/lib/constants";
import { sleep } from "@/lib/utils";
import Image from "next/image";

type BorrowButtonProps = {
	buttonText?: string;
	bookId: string;
	userId: string;
};

export default function BorrowButton({
	buttonText = "Borrow Book",
	bookId,
	userId,
}: BorrowButtonProps) {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleBorrowBook = async () => {
		setIsPending(true);
		await sleep(500);

		const result = await borrowBook({ bookId, userId });
		const { message, success } = result;

		if (!success) {
			toast.error("Borrow Error!", {
				duration: 5000,
				description: message,
				style: toastVariants.destructive,
			});
		}

		if (success) {
			toast.success("Borrow Successful!", {
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
			className="book-overview_btn"
			disabled={isPending}
			onClick={handleBorrowBook}
		>
			<Image src="/icons/book.svg" alt="book" width={20} height={20} />
			<p className="font-bebas-neue text-xl text-dark-100">
				{isPending ? "Borrowing..." : buttonText}
			</p>
		</Button>
	);
}
