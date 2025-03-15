"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
	const searchParams = useSearchParams();
	const searchParamsObj = Object.fromEntries(searchParams.entries());

	if (searchParamsObj.logout === "success") {
		toast.success("User signed out successfully.", {
			style: {
				color: "#fff",
				backgroundColor: "#333",
				border: "1px solid #777",
			},
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
