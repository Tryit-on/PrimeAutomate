import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const key = req.headers["x-admin-key"] ?? req.query.key;
  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const submissions = await storage.getIntakeSubmissions();
    return res.json(submissions);
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return res.status(500).json({ message: "Failed to fetch submissions" });
  }
}
