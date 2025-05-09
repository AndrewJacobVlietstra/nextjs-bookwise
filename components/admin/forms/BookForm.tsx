"use client";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";

interface BookFormProps extends Partial<Book> {
	type?: "create" | "update";
}

export default function BookForm({ type, ...book }: BookFormProps) {
	const router = useRouter();

	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			description: "",
			author: "",
			genre: "",
			rating: 1,
			totalCopies: 1,
			coverUrl: "",
			coverColor: "",
			videoUrl: "",
			summary: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof bookSchema>) => {};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name={"title"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Title
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book title"
									className="book-form_input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"author"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Author
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book author"
									className="book-form_input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"genre"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Genre
							</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book genre"
									className="book-form_input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"rating"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Rating
							</FormLabel>
							<FormControl>
								<Input
									required
									type="number"
									min={1}
									max={5}
									placeholder="Book rating"
									className="book-form_input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
