import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Abuse controls only. No conversations, raw IP addresses, or contact records.
export const assistantLimits = sqliteTable("assistant_limits", {
  bucket: text("bucket").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
}, table => [index("assistant_limits_expiry").on(table.expiresAt)]);
