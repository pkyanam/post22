import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { toDateString } from "./_helpers/dates";
import { api } from "./_generated/api";

export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db
      .query("completions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const listByUserAndSection = query({
  args: { sectionId: v.string() },
  handler: async (ctx, { sectionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return ctx.db
      .query("completions")
      .withIndex("by_userId_and_section", (q) =>
        q.eq("userId", userId).eq("sectionId", sectionId)
      )
      .collect();
  },
});

export const markComplete = mutation({
  args: {
    assignmentId: v.string(),
    sectionId: v.string(),
    reflection: v.optional(v.string()),
  },
  handler: async (ctx, { assignmentId, sectionId, reflection }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Idempotent: don't double-insert
    const existing = await ctx.db
      .query("completions")
      .withIndex("by_userId_and_section", (q) =>
        q.eq("userId", userId).eq("sectionId", sectionId)
      )
      .filter((q) => q.eq(q.field("assignmentId"), assignmentId))
      .first();

    if (!existing) {
      await ctx.db.insert("completions", {
        userId,
        assignmentId,
        sectionId,
        reflection,
        completedAt: Date.now(),
        completedDate: toDateString(Date.now()),
      });
    }

    await ctx.runMutation(api.users.recalcStreakAndXP, {});
  },
});

export const undoComplete = mutation({
  args: { assignmentId: v.string(), sectionId: v.string() },
  handler: async (ctx, { assignmentId, sectionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("completions")
      .withIndex("by_userId_and_section", (q) =>
        q.eq("userId", userId).eq("sectionId", sectionId)
      )
      .filter((q) => q.eq(q.field("assignmentId"), assignmentId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }

    await ctx.runMutation(api.users.recalcStreakAndXP, {});
  },
});

export const updateReflection = mutation({
  args: { assignmentId: v.string(), sectionId: v.string(), reflection: v.string() },
  handler: async (ctx, { assignmentId, sectionId, reflection }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("completions")
      .withIndex("by_userId_and_section", (q) =>
        q.eq("userId", userId).eq("sectionId", sectionId)
      )
      .filter((q) => q.eq(q.field("assignmentId"), assignmentId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { reflection });
      await ctx.runMutation(api.users.recalcStreakAndXP, {});
    }
  },
});
