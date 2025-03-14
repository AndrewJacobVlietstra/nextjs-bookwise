import {
	date,
	boolean,
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
