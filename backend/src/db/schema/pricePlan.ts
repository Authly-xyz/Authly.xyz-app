import * as pg from "drizzle-orm/pg-core";
import { timestamps } from "./utils";

// pricing plan table
export const pricePlanTable = pg.pgTable(
  "price_plan",
  {
    id: pg.uuid("id").primaryKey().defaultRandom(),
    name: pg.varchar("name", { length: 256 }).notNull(),
    maxApps: pg.integer("max_apps").notNull(),
    maxUsers: pg.integer("max_users").notNull(),
    priceMonth: pg.integer("price_month").notNull(),
    priceYear: pg.integer("price_year").notNull(),
    otherFeatures: pg.varchar("other_features").array().default([]),
    ...timestamps,
  },
  (table) => [
    pg.uniqueIndex("plan_name_idx").on(table.name),
    pg.uniqueIndex("plan_id_idx").on(table.id),
  ]
);
