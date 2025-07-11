import dummyBooks from "../dummyBooks.json";
import ImageKit from "imagekit";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
	urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
	fileUrl: string,
	fileName: string,
	folderPath: string
) => {
	try {
		const response = await imagekit.upload({
			file: fileUrl,
			fileName,
			folder: folderPath,
		});

		return response.filePath;
	} catch (error) {
		console.error("Error uploading to ImageKit: ", error);
	}
};

const seed = async () => {
	console.log("Seeding data...");

	try {
		for (const book of dummyBooks) {
			const coverUrl = (await uploadToImageKit(
				book.coverUrl,
				`${book.title}.jpg`,
				"/books/covers"
			)) as string;

			const videoUrl = (await uploadToImageKit(
				book.videoUrl,
				`${book.title}.mp4`,
				"/books/videos"
			)) as string;

			await db.insert(books).values({
				...book,
				rating: book.rating.toString(),
				coverUrl,
				videoUrl,
			});
		}

		console.log("Data seeded successfully!");
	} catch (error) {
		console.error("Error seeding data: ", error);
	}
};

// seed();
