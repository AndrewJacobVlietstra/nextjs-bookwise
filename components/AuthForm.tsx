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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { toast } from "sonner";
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import AuthButton from "./AuthButton";

type AuthFormProps<T extends FieldValues> = {
	defaultValues: T;
	type: "signin" | "signup";
	schema: ZodType<T>;
	onSubmit: (data: T) => Promise<{ success: boolean; message?: string }>;
};

export default function AuthForm<T extends FieldValues>({
	type,
	schema,
	defaultValues,
	onSubmit,
}: AuthFormProps<T>) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const isSignIn = type === "signin";

	const form: UseFormReturn<T> = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	});

	const handleSubmit: SubmitHandler<T> = async (data) => {
		setIsPending((prev) => !prev);
		const result = await onSubmit(data);

		if (result.success) {
			toast.success(result.message, {
				style: {
					color: "#fff",
					backgroundColor: "#333",
					border: "1px solid #777",
				},
				duration: 5000,
			});

			router.push("/");
		} else if (!result.success) {
			toast.error(result.message, {
				style: {
					color: "#fff",
					backgroundColor: "#E23D28",
					border: "1px solid #FF7F50",
				},
				duration: 5000,
			});
		}

		setIsPending((prev) => !prev);
	};

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

					<AuthButton authType={type} isPending={isPending} />
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
