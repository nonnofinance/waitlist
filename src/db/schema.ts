import {
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const waitlistTable = pgTable("waitlist", {
	id: uuid("id")
		.primaryKey()
		.defaultRandom(),

	email: text("email")
		.notNull()
		.unique(),

	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),

	updatedAt: timestamp("updated_at", {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});
