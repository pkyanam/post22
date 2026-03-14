"use client";

import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ASSIGNMENTS_BY_SECTION } from "@/lib/assignments";

export function SectionProgressBar({ sectionId }: { sectionId: string }) {
  const { isAuthenticated } = useConvexAuth();
  const completions = useQuery(
    api.completions.listByUserAndSection,
    isAuthenticated ? { sectionId } : "skip"
  );

  const total = ASSIGNMENTS_BY_SECTION[sectionId]?.length ?? 0;
  const done = completions?.length ?? 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (!isAuthenticated) return null;

  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-700 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-stone-500 whitespace-nowrap">
        {done}/{total} complete
      </span>
    </div>
  );
}
