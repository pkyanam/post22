"use client";

import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LEVEL_NAMES, LEVEL_THRESHOLDS } from "@/convex/_helpers/xp";

export function GamificationBar() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getOrNull, isAuthenticated ? {} : "skip");

  if (!isAuthenticated || !user) return null;

  const levelIndex = Math.min(user.level - 1, LEVEL_NAMES.length - 1);
  const levelName = LEVEL_NAMES[levelIndex];
  const currentThreshold = LEVEL_THRESHOLDS[user.level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[user.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInLevel = user.totalXp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
      <span className="hidden sm:inline font-medium text-stone-700 dark:text-stone-300">{levelName}</span>
      <div className="hidden sm:flex items-center gap-1.5">
        <div className="w-20 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-700 dark:bg-stone-400 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span>{user.totalXp} XP</span>
      </div>
      {user.streak > 0 && (
        <span className="flex items-center gap-0.5">
          <span>🔥</span>
          <span>{user.streak}</span>
        </span>
      )}
    </div>
  );
}
