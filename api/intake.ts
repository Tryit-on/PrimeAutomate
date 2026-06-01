import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";
import { insertIntakeSchema } from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import type { InsertIntake } from "../shared/schema";

async function sendLeadNotification(data: InsertIntake) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !adminEmail) return;

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
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: adminEmail,
        subject: `New Lead: ${data.businessName} — ${data.mainGoal}`,
        html,
      }),
    });
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = insertIntakeSchema.parse(req.body);
    const submission = await storage.createIntakeSubmission(data);
    sendLeadNotification(data);
    return res.status(201).json(submission);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: fromZodError(error).message });
    }
    console.error("Intake submission error:", error);
    return res.status(500).json({ message: "Failed to save submission" });
  }
}
