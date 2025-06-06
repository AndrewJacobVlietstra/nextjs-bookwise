"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { toastVariants } from "@/lib/constants";

export default function SignInPage() {
	const searchParams = useSearchParams();
	const searchParamsObj = Object.fromEntries(searchParams.entries());

	if (searchParamsObj.logout === "success") {
		toast.success("User signed out successfully.", {
			style: toastVariants.default,
			duration: 5000,
		});
	}

	return (
		<AuthForm
			type="signin"
			schema={signInSchema}
			defaultValues={{
				email: "",
				password: "",
			}}
			onSubmit={signInWithCredentials}
		/>
	);
}
