import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const intakeSubmissions = pgTable("intake_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  website: text("website"),
  businessType: text("business_type").notNull(),
  teamSize: text("team_size").notNull(),
  customerChannels: text("customer_channels").array().notNull(),
  painPoints: text("pain_points").array().notNull(),
  processesToAutomate: text("processes_to_automate").array().notNull(),
  mainGoal: text("main_goal").notNull(),
  timeline: text("timeline").notNull(),
  tools: text("tools"),
  budget: text("budget").notNull(),
  additionalInfo: text("additional_info"),
  contactMethod: text("contact_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIntakeSchema = createInsertSchema(intakeSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertIntake = z.infer<typeof insertIntakeSchema>;
export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
