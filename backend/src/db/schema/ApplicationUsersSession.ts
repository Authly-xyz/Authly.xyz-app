import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { applicationUsersTable } from "./ApplicationUsers";

// Session table for application users
export const applicationUsersSessionTable = pg.pgTable(
  "application_user_sessions",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    userId: pg
      .uuid("user_id")
      .references(() => applicationUsersTable.id)
      .notNull(),
    ipAddress: pg.varchar("ip_address", { length: 45 }).notNull(), // IPv6 compatible
    userAgent: pg.varchar("user_agent", { length: 512 }).notNull(), // Browser/device info
    valid: pg.boolean("valid").default(true).notNull(), // Session validity
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("a_session_id_idx").on(table.id),
    pg.uniqueIndex("a_session_user_id_idx").on(table.userId),
  ]
);

// Define relations for the application user session table with the application user table (one-to-one)
// one user session belongs to one application user
export const applicationUsersSessionRelations = relations(
  applicationUsersSessionTable,
  ({ one }) => ({
    user: one(applicationUsersTable, {
      fields: [applicationUsersSessionTable.userId],
      references: [applicationUsersTable.id],
    }),
  })
);
