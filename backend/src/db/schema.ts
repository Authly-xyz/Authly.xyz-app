// import {
//   integer,
//   pgTable,
//   pgEnum,
//   varchar,
//   timestamp,
//   boolean,
//   uuid,
//   json,
// } from "drizzle-orm/pg-core";
// import * as t from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";
//
// // Reusable timestamps for created and updated fields
// const timestamps = {
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// };
//
// // Enums
// // for auth types
// export const authTypeEnum = pgEnum("auth_type", ["OAUTH", "EMAIL", "BOTH"]);
// export const actionEnum = pgEnum("action", ["LOGIN", "LOGOUT", "ROLE_CHANGE"]);
//
// // Table definitions
// // global user table ( for global/organization level users )
// export const globalUserTable = pgTable(
//   "global_users",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     email: varchar("email", { length: 256 }).notNull().unique(),
//     name: varchar("name", { length: 256 }).notNull(),
//     emailVerified: boolean("email_verified").default(false).notNull(),
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("g_email_idx").on(table.email),
//     t.uniqueIndex("g_user_id_idx").on(table.id),
//   ]
// );
//
// // pricing plan table
// export const pricePlanTable = pgTable(
//   "price_plan",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     name: varchar("name", { length: 256 }).notNull(),
//     maxApps: integer("max_apps").notNull(),
//     maxUsers: integer("max_users").notNull(),
//     priceMonth: integer("price_month").notNull(),
//     priceYear: integer("price_year").notNull(),
//     otherFeatures: varchar("other_features").array().default([]),
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("plan_name_idx").on(table.name),
//     t.uniqueIndex("plan_id_idx").on(table.id),
//   ]
// );
//
// // organization table
// export const organizationTable = pgTable(
//   "organizations",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     name: varchar("name", { length: 256 }).notNull(),
//     email: varchar("email", { length: 256 }).notNull().unique(),
//     contactInfo: varchar("contact_info", { length: 512 }).notNull(),
//     logoUrl: varchar("logo_url", { length: 512 }),
//     region: varchar("region", { length: 128 }).notNull(),
//     planId: uuid("plan_id")
//       .references(() => pricePlanTable.id)
//       .notNull(),
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("org_name_idx").on(table.name),
//     t.uniqueIndex("org_id_idx").on(table.id),
//     t.uniqueIndex("org_email_idx").on(table.email),
//   ]
// );
//
// // organization Authors table
// export const organizationAuthorsTable = pgTable(
//   "organization_authors",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     orgId: uuid("org_id")
//       .references(() => organizationTable.id)
//       .notNull(),
//     userId: uuid("user_id")
//       .references(() => globalUserTable.id)
//       .notNull(),
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("org_authors_org_id_idx").on(table.orgId),
//     t.uniqueIndex("org_authors_user_id_idx").on(table.userId),
//   ]
// );
//
// // Application table
// export const applicationTable = pgTable(
//   "applications",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     orgId: uuid("org_id")
//       .references(() => organizationTable.id)
//       .notNull(),
//     privateKey: varchar("private_key", { length: 512 }).notNull(), // auto generated
//     publicKey: varchar("public_key", { length: 512 }).notNull(), // auto generated
//     name: varchar("name", { length: 256 }).notNull(),
//     websiteUrl: varchar("website_url", { length: 512 }), // url of the client website
//     redirectUrl: varchar("redirect_url", { length: 512 }), // url of the client web site
//     authType: authTypeEnum("auth_type").notNull().default("EMAIL"), // Enum for OAuth, email, or both
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("a_name_idx").on(table.name),
//     t.uniqueIndex("a_id_idx").on(table.id),
//     t.uniqueIndex("a_org_id_idx").on(table.orgId),
//   ]
// );
//
// // Application User role table
// export const applicationUserRoleTable = pgTable(
//   "application_user_roles",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     applicationId: uuid("application_id")
//       .references(() => applicationTable.id)
//       .notNull(),
//     role: varchar("role", { length: 256 }).notNull(), // like user, admin, or custom
//     permission: varchar("permission").array().notNull().default([]), // string array of permissions
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("role_name_idx").on(table.role),
//     t.uniqueIndex("role_id_idx").on(table.id),
//     t.uniqueIndex("role_app_id_idx").on(table.applicationId),
//   ]
// );
//
// // Application User table
// export const applicationUserTable = pgTable(
//   "application_user",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     applicationId: uuid("application_id")
//       .references(() => applicationTable.id)
//       .notNull(),
//     roleId: uuid("role_id")
//       .references(() => applicationUserRoleTable.id)
//       .notNull(),
//     name: varchar("name", { length: 256 }).notNull(),
//     email: varchar("email", { length: 256 }).notNull().unique(),
//     emailVerified: boolean("email_verified").default(false).notNull(),
//     lastLogIn: timestamp("last_log_in").defaultNow().notNull(),
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("a_user_email_idx").on(table.email),
//     t.uniqueIndex("a_user_id_idx").on(table.id),
//     t.uniqueIndex("a_user_app_id_idx").on(table.applicationId),
//     t.uniqueIndex("a_user_role_id_idx").on(table.roleId),
//   ]
// );
//
// // Session table for application users
// export const applicationUserSessionTable = pgTable(
//   "application_user_sessions",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     userId: uuid("user_id")
//       .references(() => applicationUserTable.id)
//       .notNull(),
//     ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 compatible
//     userAgent: varchar("user_agent", { length: 512 }).notNull(), // Browser/device info
//     valid: boolean("valid").default(true).notNull(), // Session validity
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("a_session_id_idx").on(table.id),
//     t.uniqueIndex("a_session_user_id_idx").on(table.userId),
//   ]
// );
//
// // session table for global users
// export const globalUserSessionTable = pgTable(
//   "global_user_sessions",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     userId: uuid("user_id")
//       .references(() => globalUserTable.id)
//       .notNull(),
//     ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 compatible
//     userAgent: varchar("user_agent", { length: 512 }).notNull(), // Browser/device info
//     valid: boolean("valid").default(true).notNull(), // Session validity
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("g_session_id_idx").on(table.id),
//     t.uniqueIndex("g_session_user_id_idx").on(table.userId),
//   ]
// );
//
// // Audit log table
// export const auditLogTable = pgTable(
//   "audit_logs",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     userId: uuid("user_id")
//       .references(() => applicationUserTable.id)
//       .notNull(),
//     applicationId: uuid("application_id")
//       .references(() => applicationTable.id)
//       .notNull(),
//     action: actionEnum("action").notNull(), // Enum for actions like LOGIN, LOGOUT, ROLE_CHANGE
//     metadata: json("metadata").notNull(), // JSON for additional data
//     ...timestamps,
//   },
//   (table) => [
//     t.uniqueIndex("audit_log_id_idx").on(table.id),
//     t.uniqueIndex("audit_log_user_id_idx").on(table.userId),
//     t.uniqueIndex("audit_log_app_id_idx").on(table.applicationId),
//   ]
// );
//
// // -------------- relations -----------------------------------------------------------
//
// export const organizationAuthorsRelations = relations(
//   organizationAuthorsTable,
//   ({ one }) => ({
//     organization: one(organizationTable, {
//       fields: [organizationAuthorsTable.orgId],
//       references: [organizationTable.id],
//     }),
//     user: one(globalUserTable, {
//       fields: [organizationAuthorsTable.userId],
//       references: [globalUserTable.id],
//     }),
//   })
// );
//
// // organization and price plan relation
// export const organizationRelations = relations(
//   organizationTable,
//   ({ one }) => ({
//     plan: one(pricePlanTable, {
//       fields: [organizationTable.planId],
//       references: [pricePlanTable.id],
//     }),
//   })
// );
//
// // Organization and global user relation
// export const globalUserRelations = relations(globalUserTable, ({ many }) => ({
//   organizations: many(organizationTable),
// }));
//
// // organization and application relation
// export const applicationRelations = relations(applicationTable, ({ one }) => ({
//   organization: one(organizationTable, {
//     fields: [applicationTable.orgId],
//     references: [organizationTable.id],
//   }),
// }));
//
// // application and role relation
// export const applicationRoleRelations = relations(
//   applicationUserRoleTable,
//   ({ one }) => ({
//     application: one(applicationTable, {
//       fields: [applicationUserRoleTable.applicationId],
//       references: [applicationTable.id],
//     }),
//   })
// );
//
// // application user relation
// export const applicationUserRelations = relations(
//   applicationUserTable,
//   ({ one }) => ({
//     application: one(applicationTable, {
//       fields: [applicationUserTable.applicationId],
//       references: [applicationTable.id],
//     }),
//     role: one(applicationUserRoleTable, {
//       fields: [applicationUserTable.roleId],
//       references: [applicationUserRoleTable.id],
//     }),
//   })
// );
//
// // application user and application role relation
// export const applicationUserRoleRelations = relations(
//   applicationUserRoleTable,
//   ({ many }) => ({
//     users: many(applicationUserTable),
//   })
// );
//
// // application user and session relation
// export const applicationUserSessionRelations = relations(
//   applicationUserSessionTable,
//   ({ one }) => ({
//     user: one(applicationUserTable, {
//       fields: [applicationUserSessionTable.userId],
//       references: [applicationUserTable.id],
//     }),
//   })
// );
//
// // global user and session relation
// export const globalUserSessionRelations = relations(
//   globalUserSessionTable,
//   ({ one }) => ({
//     user: one(globalUserTable, {
//       fields: [globalUserSessionTable.userId],
//       references: [globalUserTable.id],
//     }),
//   })
// );
//
// // application user and audit log relation
// export const applicationUserAuditLogRelations = relations(
//   auditLogTable,
//   ({ one }) => ({
//     user: one(applicationUserTable, {
//       fields: [auditLogTable.userId],
//       references: [applicationUserTable.id],
//     }),
//   })
// );
//
// // application and audit log relation
// export const applicationAuditLogRelations = relations(
//   auditLogTable,
//   ({ one }) => ({
//     application: one(applicationTable, {
//       fields: [auditLogTable.applicationId],
//       references: [applicationTable.id],
//     }),
//   })
// );
