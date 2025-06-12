import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { applicationsTable } from "./application";

// Application User role table
export const applicationUsersRoleTable = pg.pgTable(
  "application_user_roles",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    applicationId: pg
      .uuid("application_id")
      .references(() => applicationsTable.id)
      .notNull(),
    role: pg.varchar("role", { length: 256 }).notNull(), // like user, admin, or custom
    permission: pg.varchar("permission").array().notNull().default([]), // string array of permissions
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("role_name_idx").on(table.role),
    pg.uniqueIndex("role_id_idx").on(table.id),
    pg.uniqueIndex("role_app_id_idx").on(table.applicationId),
  ]
);

// Define relations for the application user role table with the application table (many-to-one)
// application user role belongs to one application
export const applicationUsersRoleRelations = relations(
  applicationUsersRoleTable,
  ({ one }) => ({
    application: one(applicationsTable, {
      fields: [applicationUsersRoleTable.applicationId],
      references: [applicationsTable.id],
    }),
  })
);
