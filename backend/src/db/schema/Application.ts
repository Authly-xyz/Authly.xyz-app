import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { organizationsTable } from "./organizations";
import { applicationUsersRoleTable } from "./applicationUsersRole";

export const authTypeEnum = pg.pgEnum("auth_type", ["OAUTH", "EMAIL", "BOTH"]);

// Application table
export const applicationsTable = pg.pgTable(
  "applications",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    orgId: pg
      .uuid("org_id")
      .references(() => organizationsTable.id)
      .notNull(),
    privateKey: pg.varchar("private_key", { length: 512 }).notNull(), // auto generated
    publicKey: pg.varchar("public_key", { length: 512 }).notNull(), // auto generated
    name: pg.varchar("name", { length: 256 }).notNull(),
    websiteUrl: pg.varchar("website_url", { length: 512 }), // url of the client website
    redirectUrl: pg.varchar("redirect_url", { length: 512 }), // url of the client web site
    authType: authTypeEnum("auth_type").notNull().default("EMAIL"), // Enum for OAuth, email, or both
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("a_name_idx").on(table.name),
    pg.uniqueIndex("a_id_idx").on(table.id),
    pg.uniqueIndex("a_org_id_idx").on(table.orgId),
  ]
);

// Define relations for the application table with the organization table (many-to-one)
// one application belongs to one organization
// one application can have multiple user roles
export const applicationRelations = relations(
  applicationsTable,
  ({ one, many }) => ({
    organization: one(organizationsTable, {
      fields: [applicationsTable.orgId],
      references: [organizationsTable.id],
    }),
    roles: many(applicationUsersRoleTable),
  })
);
