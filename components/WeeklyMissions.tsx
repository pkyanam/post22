"use client";

import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getISOWeekKey } from "@/lib/dateUtils";

export function WeeklyMissions() {
  const { isAuthenticated } = useConvexAuth();
  const weekKey = getISOWeekKey();
  const missions = useQuery(
    api.weeklyMissions.getWeekProgress,
    isAuthenticated ? { weekKey } : "skip"
  );

  if (!isAuthenticated || !missions) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Weekly Missions</h2>
      <div className="space-y-3">
        {missions.map((m) => (
          <div
            key={m.missionId}
            className={`border rounded-lg p-4 ${
              m.completed
                ? "border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800/50"
                : "border-stone-200 dark:border-stone-700 bg-white dark:bg-transparent"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  {m.completed && (
                    <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  )}
                  <span className={`text-sm font-medium ${m.completed ? "text-stone-400 dark:text-stone-500 line-through" : "text-stone-800 dark:text-stone-200"}`}>
                    {m.title}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{m.description}</p>
              </div>
              <span className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                +{m.xpReward} XP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-700 dark:bg-stone-400 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (m.progress / m.targetValue) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-stone-400 dark:text-stone-500">
                {m.progress}/{m.targetValue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
