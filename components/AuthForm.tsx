import {
	DefaultValues,
	FieldValues,
	SubmitHandler,
	UseFormReturn,
	useForm,
} from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import Link from "next/link";

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
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
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
