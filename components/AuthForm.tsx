import {
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
	UseFormReturn,
	useForm,
} from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants";
import Link from "next/link";
import ImageUpload from "./ImageUpload";

type AuthFormProps<T extends FieldValues> = {
	defaultValues: T;
	type: "signin" | "signup";
	schema: ZodType<T>;
	onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
};

export default function AuthForm<T extends FieldValues>({
	type,
	schema,
	defaultValues,
	onSubmit,
}: AuthFormProps<T>) {
	const isSignIn = type === "signin";

	const form: UseFormReturn<T> = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	});

	const handleSubmit: SubmitHandler<T> = async (data) => {};

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold text-white">
				{isSignIn ? "Welcome back to BookWise" : "Create your library account"}
			</h1>

			<p className="text-light-100">
				{isSignIn
					? "Access the vast collection of resources, and stay updated."
					: "Please fill out all fields and upload a valid university ID to gain access to the library."}
			</p>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-6 w-full"
				>
					{Object.keys(defaultValues).map((field) => (
						<FormField
							key={field}
							control={form.control}
							name={field as Path<T>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="capitalize">
										{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
									</FormLabel>
									<FormControl>
										{field.name === "universityCard" ? (
											<ImageUpload onFileChange={field.onChange} />
										) : (
											<Input
												className="form-input"
												type={
													FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
												}
												required
												{...field}
											/>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button className="form-btn" type="submit">
						{isSignIn ? "Sign In" : "Create Account"}
					</Button>
				</form>
			</Form>

			<p className="text-center text-base font-medium">
				{isSignIn ? "New to BookWise? " : "Already have an account? "}

				<Link
					href={isSignIn ? "/signup" : "/signin"}
					className="font-bold text-primary/90 hover:text-primary transition-all"
				>
					{isSignIn ? "Create an account" : "Sign in"}
				</Link>
			</p>
		</div>
	);
}
