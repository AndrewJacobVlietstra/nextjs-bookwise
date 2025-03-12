"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

export default function SignUpPage() {
	return (
		<AuthForm
			type="signup"
			schema={signUpSchema}
			defaultValues={{
				fullName: "",
				email: "",
				password: "",
				universityId: 0,
				universityCard: "",
			}}
			onSubmit={() => {}}
		/>
	);
}
