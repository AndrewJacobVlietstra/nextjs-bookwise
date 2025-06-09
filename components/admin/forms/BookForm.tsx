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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";

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

	const onSubmit = async (values: z.infer<typeof bookSchema>) => {
		console.log(values);
	};

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
				<FormField
					control={form.control}
					name={"totalCopies"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Total Copies
							</FormLabel>
							<FormControl>
								<Input
									required
									type="number"
									min={1}
									max={10000}
									placeholder="Total Copies"
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
					name={"description"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									className="book-form_input"
									placeholder="Book Description..."
									rows={5}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"summary"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Summary
							</FormLabel>
							<FormControl>
								<Textarea
									className="book-form_input"
									placeholder="Book Summary..."
									rows={5}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"coverColor"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Cover Color
							</FormLabel>
							<FormControl>
								<ColorPicker
									value={field.value}
									onPickerChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"coverUrl"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Cover URL
							</FormLabel>
							<FormControl>
								<FileUpload
									type="image"
									accept="image/*"
									placeholder="Upload a Book Cover"
									folder="books/covers"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name={"videoUrl"}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">
								Book Trailer
							</FormLabel>
							<FormControl>
								<FileUpload
									type="video"
									accept="video/*"
									placeholder="Upload a Book Trailer"
									folder="books/videos"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="book-form_btn text-white">
					Add Book to Library
				</Button>
			</form>
		</Form>
	);
}
