import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIntakeSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/intake", async (req, res) => {
    try {
      const data = insertIntakeSchema.parse(req.body);
      const submission = await storage.createIntakeSubmission(data);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        console.error("Intake submission error:", error);
        res.status(500).json({ message: "Failed to save submission" });
      }
    }
  });

  app.get("/api/intake", async (_req, res) => {
    try {
      const submissions = await storage.getIntakeSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Fetch submissions error:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  return httpServer;
}
