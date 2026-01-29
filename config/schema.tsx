import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { report } from "process";

export const usersTable = pgTable("usersTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});

export const SessionsTable = pgTable("sessionsChart", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull().unique(),
  notes: text(),
  selectedDoctor: json(),
  conversation: json(),
  report: json(),
  createdBy: varchar().references(() => usersTable.email),
  createdAt: varchar()
});
