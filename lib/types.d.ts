type AuthFormTypes = "signin" | "signup";

type AuthCredentials = {
	fullName: string;
	email: string;
	password: string;
	universityId: number;
	universityCard: string;
};

type ActionError = { success: boolean; message: string } | undefined;

type Book = {
	id: string;
	title: string;
	author: string;
	genre: string;
	rating: number;
	totalCopies: number;
	availableCopies: number;
	description: string;
	coverColor: string;
	coverUrl: string;
	videoUrl: string;
	summary: string;
	createdAt?: Date | null;
};

type BookData = {
	title: string;
	author: string;
	genre: string;
	rating: number;
	totalCopies: number;
	description: string;
	summary: string;
	coverColor: string;
	coverUrl: string;
	videoUrl: string;
};

type LibraryUser = {
	fullName: string;
	email: string;
	password: string;
	universityId: number;
	universityCard: string;
};

type BorrowBookParams = {
	bookId: string;
	userId: string;
};
