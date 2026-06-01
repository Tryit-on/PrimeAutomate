import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { desc } from "drizzle-orm";

const intakeSubmissions = pgTable("intake_submissions", {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const key = req.headers["x-admin-key"] ?? req.query.key;
  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  try {
    const submissions = await db
      .select()
      .from(intakeSubmissions)
      .orderBy(desc(intakeSubmissions.createdAt));
    return res.json(submissions);
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return res.status(500).json({ message: "Failed to fetch submissions" });
  }
}
