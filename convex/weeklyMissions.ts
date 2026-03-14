import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getWeekBounds } from "./_helpers/dates";
import { WEEKLY_MISSIONS } from "../lib/missions";

/** Derives mission progress from completions within the given ISO week. */
export const getWeekProgress = query({
  args: { weekKey: v.string() },
  handler: async (ctx, { weekKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const { start, end } = getWeekBounds(weekKey);

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const weekCompletions = completions.filter(
      (c) => c.completedDate >= start && c.completedDate <= end
    );

    return WEEKLY_MISSIONS.map((mission) => {
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
        case "section_completion": {
          progress = weekCompletions.filter(
            (c) => c.sectionId === mission.targetSection
          ).length;
          break;
        }
        case "multi_section_completion": {
          const sections = mission.targetSections ?? [];
          progress = weekCompletions.filter((c) =>
            sections.includes(c.sectionId)
          ).length;
          break;
        }
        case "same_day_completion": {
          // Count max completions in a single day
          const byDay: Record<string, number> = {};
          for (const c of weekCompletions) {
            byDay[c.completedDate] = (byDay[c.completedDate] ?? 0) + 1;
          }
          progress = Math.max(0, ...Object.values(byDay));
          break;
        }
      }

      return {
        missionId: mission.id,
        title: mission.title,
        description: mission.description,
        xpReward: mission.xpReward,
        targetValue: mission.targetValue,
        progress: Math.min(progress, mission.targetValue),
        completed: progress >= mission.targetValue,
      };
    });
  },
});
