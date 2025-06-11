import { integer, pgTable,pgEnum, varchar, timestamp, boolean, uuid, json} from "drizzle-orm/pg-core";

// Reusable timestamps for created and updated fields
const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}

// Enums 
// for auth types
export const authTypeEnum = pgEnum("auth_type", ["OAUTH", "EMAIL", "BOTH"])
export const actionEnum = pgEnum("action", ["LOGIN", "LOGOUT", "ROLE_CHANGE"])

// Table definitions
// global user table ( for global/organization level users )
export const globalUserTable = pgTable("global_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  ...timestamps,
})

// pricing plan table
export const pricePlanTable = pgTable("price_plan", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  maxApps: integer("max_apps").notNull(),
  maxUsers: integer("max_users").notNull(),
  priceMonth: integer("price_month").notNull(),
  priceYear: integer("price_year").notNull(),
  otherFeatures: varchar("other_features").array().default([]),
  ...timestamps,
})

// organization table
export const organizationTable = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  contactInfo: varchar("contact_info", { length: 512 }).notNull(),
  logoUrl: varchar("logo_url", { length: 512 }),
  region: varchar("region", { length: 128 }).notNull(),
  planId: uuid("plan_id").references(() => pricePlanTable.id).notNull(),
  authors: uuid("authors").array().references(() => globalUserTable.id).default([]),
  ...timestamps,
})

// Application table
export const applicationTable = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").references(() => organizationTable.id).notNull(),
  privateKey: varchar("private_key", { length: 512 }).notNull(), // auto generated
  publicKey: varchar("public_key", { length: 512 }).notNull(), // auto generated
  name: varchar("name", { length: 256 }).notNull(),
  websiteUrl: varchar("website_url", { length: 512 }), // url of the client website
  redirectUrl: varchar("redirect_url", { length: 512 }), // url of the client web site
  authType: authTypeEnum("auth_type").notNull().default("EMAIL"), // Enum for OAuth, email, or both
  ...timestamps,
})

// Application User role table
export const applicationUserRoleTable = pgTable("application_user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applicationTable.id).notNull(),
  role: varchar("role", { length: 256 }).notNull(), // like user, admin, or custom
  permission: varchar("permission").array().notNull().default([]), // string array of permissions
  ...timestamps,
})

// Application User table
export const applicationUserTable = pgTable("application_user", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applicationTable.id).notNull(),
  roleId: uuid("role_id").references(() => applicationUserRoleTable.id).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  lastLogIn: timestamp("last_log_in").defaultNow().notNull(),
  ...timestamps,
})

// Session table
export const sessionTable = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => applicationUserTable.id).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 compatible
  userAgent: varchar("user_agent", { length: 512 }).notNull(), // Browser/device info
  valid: boolean("valid").default(true).notNull(), // Session validity
  ...timestamps,
})

// Audit log table
export const auditLogTable = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => applicationUserTable.id).notNull(),
  applicationId: uuid("application_id").references(() => applicationTable.id).notNull(),
  action: actionEnum("action").notNull(), // Enum for actions like LOGIN, LOGOUT, ROLE_CHANGE
  metadata: json("metadata").notNull(), // JSON for additional data
  ...timestamps,
})
