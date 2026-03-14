import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Gamification progress — separate from auth users table
  userProgress: defineTable({
    userId: v.id("users"),
    streak: v.number(),
    totalXp: v.number(),
    level: v.number(),
    lastActiveDate: v.optional(v.string()), // "YYYY-MM-DD"
  }).index("by_userId", ["userId"]),

  completions: defineTable({
    userId: v.id("users"),
    assignmentId: v.string(),
    sectionId: v.string(),
    reflection: v.optional(v.string()),
    completedAt: v.number(), // epoch ms
    completedDate: v.string(), // "YYYY-MM-DD"
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_section", ["userId", "sectionId"]),
});
