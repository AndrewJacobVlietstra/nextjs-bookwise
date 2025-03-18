import { Button } from "./ui/button";

type AuthButtonProps = {
	authType: "signin" | "signup";
	isPending: boolean;
};

export default function AuthButton({ authType, isPending }: AuthButtonProps) {
	const isSignin = authType === "signin";
	const isSignup = authType === "signup";

	return (
		<Button className="form-btn" type="submit" disabled={isPending}>
			{isSignin && isPending ? "Signing In..." : isSignin && "Sign In"}

			{isSignup && isPending
				? "Creating Your Account..."
				: isSignup && "Create Account"}
		</Button>
	);
}
