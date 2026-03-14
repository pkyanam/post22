"use client";

import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LEVEL_NAMES, LEVEL_THRESHOLDS } from "@/convex/_helpers/xp";
import { ASSIGNMENTS_BY_SECTION } from "@/lib/assignments";
import { WeeklyMissions } from "./WeeklyMissions";
import Link from "next/link";

const SECTIONS = [
  { id: "stabilize", label: "Stabilize", href: "/stabilize" },
  { id: "career", label: "Career", href: "/career" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "income", label: "Income", href: "/income" },
  { id: "daily", label: "Daily", href: "/daily" },
];

function SectionGrid() {
  const { isAuthenticated } = useConvexAuth();
  const allCompletions = useQuery(api.completions.listByUser, isAuthenticated ? {} : "skip");

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SECTIONS.map((s) => {
        const total = ASSIGNMENTS_BY_SECTION[s.id]?.length ?? 0;
        const done = allCompletions?.filter((c) => c.sectionId === s.id).length ?? 0;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        return (
          <Link
            key={s.id}
            href={s.href}
            className="block border border-stone-200 rounded-lg p-4 hover:border-stone-400 hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-stone-800">{s.label}</span>
              <span className="text-xs text-stone-500">{done}/{total}</span>
            </div>
            <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-700 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function Dashboard() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getOrNull, isAuthenticated ? {} : "skip");

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16 text-stone-500">
        <p>Sign in to view your dashboard.</p>
        <Link href="/signin" className="mt-4 inline-block text-stone-900 font-medium underline">
          Sign in with Google
        </Link>
      </div>
    );
  }

  if (!user) {
    return <div className="text-stone-400 text-sm">Loading…</div>;
  }

  const levelIndex = Math.min(user.level - 1, LEVEL_NAMES.length - 1);
  const levelName = LEVEL_NAMES[levelIndex];
  const currentThreshold = LEVEL_THRESHOLDS[user.level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[user.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInLevel = user.totalXp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <div className="space-y-10">
      {/* Level card */}
      <div className="border border-stone-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-stone-500">Level {user.level}</p>
            <h2 className="text-2xl font-semibold text-stone-900">{levelName}</h2>
          </div>
          {user.streak > 0 && (
            <div className="text-right">
              <span className="text-2xl">🔥</span>
              <p className="text-sm text-stone-600 font-medium">{user.streak}-day streak</p>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-stone-500">
            <span>{user.totalXp} XP total</span>
            <span>{xpInLevel}/{xpNeeded} to next level</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-700 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Section progress */}
      <div>
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Progress by Section</h2>
        <SectionGrid />
      </div>

      {/* Weekly missions */}
      <WeeklyMissions />
    </div>
  );
}
