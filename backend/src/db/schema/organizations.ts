import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { pricePlanTable } from "./pricePlan";
import { organizationAuthorsTable } from "./organizationAuthors";

// organization table
export const organizationsTable = pg.pgTable(
  "organizations",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    name: pg.varchar("name", { length: 256 }).notNull(),
    email: pg.varchar("email", { length: 256 }).notNull().unique(),
    contactInfo: pg.varchar("contact_info", { length: 512 }).notNull(),
    logoUrl: pg.varchar("logo_url", { length: 512 }),
    region: pg.varchar("region", { length: 128 }).notNull(),
    planId: pg
      .uuid("plan_id")
      .references(() => pricePlanTable.id)
      .notNull(),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("org_name_idx").on(table.name),
    pg.uniqueIndex("org_id_idx").on(table.id),
    pg.uniqueIndex("org_email_idx").on(table.email),
  ]
);

// Define relations for the organization table with the price plan table (one-to-one)
// one organization has one price plan
// organization can have multiple authors
export const organizationRelations = relations(
  organizationsTable,
  ({ one, many }) => ({
    pricePlan: one(pricePlanTable, {
      fields: [organizationsTable.planId],
      references: [pricePlanTable.id],
    }),
    authors: many(organizationAuthorsTable),
  })
);
