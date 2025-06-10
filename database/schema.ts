import {
	date,
	boolean,
	numeric,
	integer,
	pgEnum,
	pgTable,
	timestamp,
	text,
	varchar,
	uuid,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const STATUS_ENUM = pgEnum("status", [
	"PENDING",
	"APPROVED",
	"REJECTED",
]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
	"BORROWED",
	"RETURNED",
]);

export const users = pgTable("users", {
	id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	status: STATUS_ENUM("status").default("PENDING"),
	role: ROLE_ENUM("role").default("USER"),
	universityId: integer("university_id").notNull().unique(),
	universityCard: text("university_card").notNull(),
	lastActivityDate: date("last_activity_date").defaultNow(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const books = pgTable("books", {
	id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
	title: varchar("title", { length: 255 }).notNull(),
	author: varchar("author", { length: 255 }).notNull(),
	genre: text("genre").notNull(),
	rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
	availableCopies: integer("available_copies").notNull().default(0),
	totalCopies: integer("total_copies").notNull().default(1),
	description: text("description").notNull(),
	summary: text("summary").notNull(),
	coverColor: varchar("cover_color", { length: 7 }).notNull(),
	coverUrl: text("cover_url").notNull(),
	videoUrl: text("video_url").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
