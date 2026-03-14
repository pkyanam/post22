import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { levelForXp, XP_PER_COMPLETION, XP_PER_REFLECTION } from "./_helpers/xp";
import { toDateString, toISOWeekKey } from "./_helpers/dates";
import { WEEKLY_MISSIONS } from "../lib/missions";

/** Returns the current user's auth info + gamification progress, or null if unauthenticated. */
export const getOrNull = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const authUser = await ctx.db.get(userId);
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return {
      userId,
      name: authUser?.name ?? null,
      email: authUser?.email ?? null,
      image: authUser?.image ?? null,
      streak: progress?.streak ?? 0,
      totalXp: progress?.totalXp ?? 0,
      level: progress?.level ?? 1,
      lastActiveDate: progress?.lastActiveDate ?? null,
    };
  },
});

/** Ensures a userProgress row exists for the current user. Call after sign-in. */
export const ensureProgress = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!existing) {
      await ctx.db.insert("userProgress", {
        userId,
        streak: 0,
        totalXp: 0,
        level: 1,
      });
    }
  },
});

/** Recomputes streak + XP + level from all completion records. */
export const recalcStreakAndXP = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // XP from individual completions
    let totalXp = 0;
    for (const c of completions) {
      totalXp += XP_PER_COMPLETION;
      if (c.reflection && c.reflection.trim().length > 0) {
        totalXp += XP_PER_REFLECTION;
      }
    }

    // XP from weekly missions: group completions by ISO week, then evaluate each mission
    const byWeek: Record<string, typeof completions> = {};
    for (const c of completions) {
      const weekKey = toISOWeekKey(c.completedDate);
      if (!byWeek[weekKey]) byWeek[weekKey] = [];
      byWeek[weekKey].push(c);
    }
    for (const weekCompletions of Object.values(byWeek)) {
      for (const mission of WEEKLY_MISSIONS) {
        let progress = 0;
        switch (mission.targetType) {
          case "any_completion":
            progress = weekCompletions.length;
            break;
          case "any_reflection":
            progress = weekCompletions.filter(
              (c) => c.reflection && c.reflection.trim().length > 0
            ).length;
            break;
          case "section_completion":
            progress = weekCompletions.filter(
              (c) => c.sectionId === mission.targetSection
            ).length;
            break;
          case "multi_section_completion": {
            const sections = mission.targetSections ?? [];
            progress = weekCompletions.filter((c) =>
              sections.includes(c.sectionId)
            ).length;
            break;
          }
          case "same_day_completion": {
            const byDay: Record<string, number> = {};
            for (const c of weekCompletions) {
              byDay[c.completedDate] = (byDay[c.completedDate] ?? 0) + 1;
            }
            progress = Math.max(0, ...Object.values(byDay));
            break;
          }
        }
        if (progress >= mission.targetValue) {
          totalXp += mission.xpReward;
        }
      }
    }

    // Streak: count consecutive days up to today
    const dateSet = new Set(completions.map((c) => c.completedDate));
    const today = toDateString(Date.now());
    let streak = 0;
    let cursor = new Date(today);
    while (dateSet.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    const level = levelForXp(totalXp);

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { totalXp, streak, level, lastActiveDate: today });
    } else {
      await ctx.db.insert("userProgress", { userId, totalXp, streak, level, lastActiveDate: today });
    }
  },
});
