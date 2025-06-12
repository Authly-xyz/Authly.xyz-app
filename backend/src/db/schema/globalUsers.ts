import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";

// global users table
export const globalUsersTable = pg.pgTable(
  "global_users",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    email: pg.varchar("email", { length: 256 }).notNull().unique(),
    name: pg.varchar("name", { length: 256 }).notNull(),
    emailVerified: pg.boolean("email_verified").default(false).notNull(),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("g_email_idx").on(table.email),
    pg.uniqueIndex("g_user_id_idx").on(table.id),
  ]
);

// Define relations for the global users table
export const globalUsersRelations = relations(
  globalUsersTable,
  ({ one }) => ({})
);
