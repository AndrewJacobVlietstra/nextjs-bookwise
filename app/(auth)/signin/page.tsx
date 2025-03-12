"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

export default function SignInPage() {
	return (
		<AuthForm
			type="signin"
			schema={signInSchema}
			defaultValues={{
				email: "",
				password: "",
			}}
			onSubmit={() => {}}
		/>
	);
}
