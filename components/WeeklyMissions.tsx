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
      <h2 className="text-lg font-semibold text-stone-900 mb-4">Weekly Missions</h2>
      <div className="space-y-3">
        {missions.map((m) => (
          <div
            key={m.missionId}
            className={`border rounded-lg p-4 ${
              m.completed ? "border-stone-300 bg-stone-50" : "border-stone-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  {m.completed && (
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  )}
                  <span className={`text-sm font-medium ${m.completed ? "text-stone-400 line-through" : "text-stone-800"}`}>
                    {m.title}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{m.description}</p>
              </div>
              <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                +{m.xpReward} XP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-700 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (m.progress / m.targetValue) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-stone-400">
                {m.progress}/{m.targetValue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
