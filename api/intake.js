import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

const insertIntakeSchema = createInsertSchema(intakeSubmissions).omit({
  id: true,
  createdAt: true,
});

async function sendLeadNotification(data) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  console.log("Resend: apiKey present =", !!apiKey, "| adminEmail =", adminEmail);
  if (!apiKey || !adminEmail) {
    console.log("Resend: aborting — missing apiKey or adminEmail");
    return;
  }

  const html = `
    <h2>New Lead: ${data.businessName}</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #eee">${data.fullName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Business</td><td style="padding:8px;border:1px solid #eee">${data.businessName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #eee">${data.website || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Business Type</td><td style="padding:8px;border:1px solid #eee">${data.businessType}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Team Size</td><td style="padding:8px;border:1px solid #eee">${data.teamSize}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Customer Channels</td><td style="padding:8px;border:1px solid #eee">${data.customerChannels.join(", ")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Pain Points</td><td style="padding:8px;border:1px solid #eee">${data.painPoints.join(", ")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Processes to Automate</td><td style="padding:8px;border:1px solid #eee">${data.processesToAutomate.join(", ")}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Main Goal</td><td style="padding:8px;border:1px solid #eee">${data.mainGoal}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Timeline</td><td style="padding:8px;border:1px solid #eee">${data.timeline}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #eee">${data.budget}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Tools</td><td style="padding:8px;border:1px solid #eee">${data.tools || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Contact Method</td><td style="padding:8px;border:1px solid #eee">${data.contactMethod}</td></tr>
      <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Additional Info</td><td style="padding:8px;border:1px solid #eee">${data.additionalInfo || "—"}</td></tr>
    </table>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: adminEmail,
        subject: `New Lead: ${data.businessName} — ${data.mainGoal}`,
        html,
      }),
    });
    const result = await response.json();
    console.log("Resend response:", response.status, JSON.stringify(result));
  } catch (err) {
    console.error("Resend fetch failed:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  try {
    const data = insertIntakeSchema.parse(req.body);
    const [submission] = await db.insert(intakeSubmissions).values(data).returning();
    await sendLeadNotification(data);
    return res.status(201).json(submission);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: fromZodError(error).message });
    }
    console.error("Intake submission error:", error);
    return res.status(500).json({ message: "Failed to save submission" });
  }
}
