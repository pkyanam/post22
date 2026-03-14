"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ASSIGNMENTS_BY_SECTION } from "@/lib/assignments";

interface Props {
  href: string;
  sectionId: string;
  title: string;
  desc: string;
}

export function HomeSectionCard({ href, sectionId, title, desc }: Props) {
  const { isAuthenticated } = useConvexAuth();
  const completions = useQuery(
    api.completions.listByUserAndSection,
    isAuthenticated ? { sectionId } : "skip"
  );

  const total = ASSIGNMENTS_BY_SECTION[sectionId]?.length ?? 0;
  const done = completions?.length ?? 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Link
      href={href}
      className="block p-5 border border-stone-200 dark:border-stone-700 rounded-lg hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
    >
      <div className="font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:text-stone-700 dark:group-hover:text-stone-300">{title}</div>
      <div className="text-sm text-stone-500 dark:text-stone-400 mb-3">{desc}</div>
      {isAuthenticated && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-600 dark:bg-stone-400 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-stone-400 dark:text-stone-500">{done}/{total}</span>
        </div>
      )}
    </Link>
  );
}
