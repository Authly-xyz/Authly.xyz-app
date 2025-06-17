import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { applicationsTable } from "./application";
import { applicationUsersRoleTable } from "./applicationUsersRole";

// enums
export const applicationUsersAuthProvider = pg.pgEnum("a_auth_provider", [
  "google",
  "github",
  "facebook",
  "twitter",
  "email",
]);

// Application User table
export const applicationUsersTable = pg.pgTable(
  "application_users",
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
    authProvider: applicationUsersAuthProvider("auth_provider").notNull(),
    providerId: pg.text("provider_id").notNull(),
    profilePicture: pg.text("profile_picture"),
    lastLogIn: pg.timestamp("last_log_in").defaultNow().notNull(),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("a_user_email_idx").on(table.email),
    pg.uniqueIndex("a_user_id_idx").on(table.id),
    pg.uniqueIndex("a_user_app_id_idx").on(table.applicationId),
    pg.uniqueIndex("a_user_role_id_idx").on(table.roleId),
    pg.uniqueIndex("a_user_provider_id_idx").on(table.providerId),
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
