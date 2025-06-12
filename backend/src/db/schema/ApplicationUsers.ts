import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { applicationsTable } from "./Application";
import { applicationUsersRoleTable } from "./applicationUsersRole";

// Application User table
export const applicationUsersTable = pg.pgTable(
  "application_user",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    applicationId: pg
      .uuid("application_id")
      .references(() => applicationsTable.id)
      .notNull(),
    roleId: pg
      .uuid("role_id")
      .references(() => applicationUsersRoleTable.id)
      .notNull(),
    name: pg.varchar("name", { length: 256 }).notNull(),
    email: pg.varchar("email", { length: 256 }).notNull().unique(),
    emailVerified: pg.boolean("email_verified").default(false).notNull(),
    lastLogIn: pg.timestamp("last_log_in").defaultNow().notNull(),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("a_user_email_idx").on(table.email),
    pg.uniqueIndex("a_user_id_idx").on(table.id),
    pg.uniqueIndex("a_user_app_id_idx").on(table.applicationId),
    pg.uniqueIndex("a_user_role_id_idx").on(table.roleId),
  ]
);

// Define relations for the application user table with the application and role tables (many-to-one)
// one application user belongs to one application
// one application user has one role
export const applicationUsersRelations = relations(
  applicationUsersTable,
  ({ one }) => ({
    application: one(applicationsTable, {
      fields: [applicationUsersTable.applicationId],
      references: [applicationsTable.id],
    }),
    role: one(applicationUsersRoleTable, {
      fields: [applicationUsersTable.roleId],
      references: [applicationUsersRoleTable.id],
    }),
  })
);
