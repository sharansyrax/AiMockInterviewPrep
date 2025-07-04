import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
})
export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: text("rating"),
  userEmail: varchar("userEmail"),
  createAt: varchar("createdAt", { length: 255 }),
})
