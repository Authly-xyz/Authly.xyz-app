import * as pg from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { applicationUsersTable } from "./ApplicationUsers";
import { applicationsTable } from "./Application";

export const actionEnum = pg.pgEnum("action", [
  "LOGIN",
  "LOGOUT",
  "ROLE_CHANGE",
]);

// Audit log table
export const auditLogTable = pg.pgTable(
  "audit_logs",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    userId: pg
      .uuid("user_id")
      .references(() => applicationUsersTable.id)
      .notNull(),
    applicationId: pg
      .uuid("application_id")
      .references(() => applicationsTable.id)
      .notNull(),
    action: actionEnum("action").notNull(), // Enum for actions like LOGIN, LOGOUT, ROLE_CHANGE
    metadata: pg.json("metadata").notNull(), // JSON for additional data
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("audit_log_id_idx").on(table.id),
    pg.uniqueIndex("audit_log_user_id_idx").on(table.userId),
    pg.uniqueIndex("audit_log_app_id_idx").on(table.applicationId),
  ]
);

// Define relations for the audit log table with the application users and applications tables (many-to-one)
// one audit log belongs to one application user
// one audit log belongs to one application
export const auditLogRelations = relations(auditLogTable, ({ one }) => ({
  user: one(applicationUsersTable, {
    fields: [auditLogTable.userId],
    references: [applicationUsersTable.id],
  }),
  application: one(applicationsTable, {
    fields: [auditLogTable.applicationId],
    references: [applicationsTable.id],
  }),
}));
