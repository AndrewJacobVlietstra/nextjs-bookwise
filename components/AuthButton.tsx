import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthButtonProps = {
	authType: "signin" | "signup";
	isPending: boolean;
};

export default function AuthButton({ authType, isPending }: AuthButtonProps) {
	return (
		<Button className="form-btn" type="submit" disabled={isPending}>
			{isPending ? "Loading..." : authType === "signin" && "Sign In"}
			{isPending ? "Loading..." : authType === "signup" && "Create Account"}
		</Button>
	);
}
