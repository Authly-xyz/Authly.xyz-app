import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { organizationsTable } from "./organizations";
import { globalUsersTable } from "./globalUsers";

// organization Authors table
export const organizationAuthorsTable = pg.pgTable(
  "organization_authors",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    orgId: pg
      .uuid("org_id")
      .references(() => organizationsTable.id)
      .notNull(),
    userId: pg
      .uuid("user_id")
      .references(() => globalUsersTable.id)
      .notNull(),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("org_authors_org_id_idx").on(table.orgId),
    pg.uniqueIndex("org_authors_user_id_idx").on(table.userId),
  ]
);
