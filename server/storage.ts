import {
  type User,
  type InsertUser,
  type IntakeSubmission,
  type InsertIntake,
  users,
  intakeSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createIntakeSubmission(data: InsertIntake): Promise<IntakeSubmission>;
  getIntakeSubmissions(): Promise<IntakeSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createIntakeSubmission(data: InsertIntake): Promise<IntakeSubmission> {
    const [submission] = await db.insert(intakeSubmissions).values(data).returning();
    return submission;
  }

  async getIntakeSubmissions(): Promise<IntakeSubmission[]> {
    return db.select().from(intakeSubmissions).orderBy(desc(intakeSubmissions.createdAt));
  }
}

export const storage = new DatabaseStorage();
