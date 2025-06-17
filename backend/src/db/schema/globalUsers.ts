import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { organizationAuthorsTable } from "./organizationAuthors";

// enums
export const globalUsersAuthProvider = pg.pgEnum("g_auth_provider", [
  "google",
  "github",
  "facebook",
  "twitter",
  "email",
]);
// global users roles and permissions
export const globalUsersRole = pg.pgEnum("g_user_role", ["user", "admin"]);
// global users permissions
export const globalUsersPermissions = pg.pgEnum("g_user_permissions", [
  "read",
  "write",
  "delete",
]);

// global users table
export const globalUsersTable = pg.pgTable(
  "global_users",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    email: pg.varchar("email", { length: 256 }).notNull().unique(),
    name: pg.varchar("name", { length: 256 }).notNull(),
    emailVerified: pg.boolean("email_verified").default(false).notNull(),
    authProvider: globalUsersAuthProvider("auth_provider").notNull(),
    providerId: pg.text("provider_id").notNull(),
    profilePicture: pg.text("profile_picture"),
    role: globalUsersRole("role").default("user").notNull(),
    permissions: globalUsersPermissions("permissions").array().default(
      ["read", "write", "delete"] // Default permissions for global users
    ),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("g_email_idx").on(table.email),
    pg.uniqueIndex("g_user_id_idx").on(table.id),
    pg.uniqueIndex("g_provider_id_idx").on(table.providerId),
  ]
);

// Define relations for the global users table
// global users can be authors in multiple organizations
export const globalUsersRelations = relations(
  globalUsersTable,
  ({ one, many }) => ({
    organizationAuthors: many(organizationAuthorsTable),
  })
);
