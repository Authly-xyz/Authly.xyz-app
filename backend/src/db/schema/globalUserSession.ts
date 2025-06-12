import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { globalUsersTable } from "./globalUsers";

// session table for global users
export const globalUserSessionTable = pg.pgTable(
  "global_user_sessions",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    userId: pg
      .uuid("user_id")
      .references(() => globalUsersTable.id)
      .notNull(),
    ipAddress: pg.varchar("ip_address", { length: 45 }).notNull(), // IPv6 compatible
    userAgent: pg.varchar("user_agent", { length: 512 }).notNull(), // Browser/device info
    valid: pg.boolean("valid").default(true).notNull(), // Session validity
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("g_session_id_idx").on(table.id),
    pg.uniqueIndex("g_session_user_id_idx").on(table.userId),
  ]
);

// Define relations for the global user session table with the global users table (one-to-one)
// one global user session belongs to one global user
export const globalUserSessionRelations = relations(
  globalUserSessionTable,
  ({ one }) => ({
    user: one(globalUsersTable, {
      fields: [globalUserSessionTable.userId],
      references: [globalUsersTable.id],
    }),
  })
);
