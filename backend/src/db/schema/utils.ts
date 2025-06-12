import * as pg from "drizzle-orm/pg-core";

// Reusable timestamps for created and updated fields
export const timestamps = {
  createdAt: pg.timestamp("created_at").defaultNow().notNull(),
  updatedAt: pg.timestamp("updated_at").defaultNow().notNull(),
};
