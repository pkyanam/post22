"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ASSIGNMENTS_BY_SECTION } from "@/lib/assignments";
import { ReflectionInput } from "./ReflectionInput";

export function AssignmentPanel({ sectionId }: { sectionId: string }) {
  const { isAuthenticated } = useConvexAuth();
  const assignments = ASSIGNMENTS_BY_SECTION[sectionId] ?? [];
  const [expanded, setExpanded] = useState<string | null>(null);

  const completions = useQuery(
    api.completions.listByUserAndSection,
    isAuthenticated ? { sectionId } : "skip"
  );
  const markComplete = useMutation(api.completions.markComplete);
  const undoComplete = useMutation(api.completions.undoComplete);

  const completedIds = new Set(completions?.map((c) => c.assignmentId) ?? []);

  if (!isAuthenticated) {
    return (
      <div className="mt-10 border-t border-stone-100 dark:border-stone-800 pt-8">
        <p className="text-sm text-stone-400 dark:text-stone-500 italic">Sign in to track assignments and earn XP.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-stone-100 dark:border-stone-800 pt-8">
      <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Assignments</h2>
      <div className="space-y-3">
        {assignments.map((a) => {
          const done = completedIds.has(a.id);
          const open = expanded === a.id;
          const completion = completions?.find((c) => c.assignmentId === a.id);

          return (
            <div
              key={a.id}
              className={`border rounded-lg transition-colors ${
                done
                  ? "border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800/50"
                  : "border-stone-200 dark:border-stone-700 bg-white dark:bg-transparent"
              }`}
            >
              <div className="flex items-start gap-3 p-4">
                {/* Checkbox */}
                <button
                  onClick={() =>
                    done
                      ? undoComplete({ assignmentId: a.id, sectionId })
                      : markComplete({ assignmentId: a.id, sectionId })
                  }
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    done
                      ? "bg-stone-700 dark:bg-stone-400 border-stone-700 dark:border-stone-400"
                      : "border-stone-300 dark:border-stone-600 hover:border-stone-500 dark:hover:border-stone-400"
                  }`}
                  aria-label={done ? "Mark incomplete" : "Mark complete"}
                >
                  {done && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => setExpanded(open ? null : a.id)}
                      className={`text-left text-sm font-medium ${
                        done ? "text-stone-400 dark:text-stone-500 line-through" : "text-stone-800 dark:text-stone-200"
                      } hover:text-stone-600 dark:hover:text-stone-400 transition-colors`}
                    >
                      {a.title}
                    </button>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-stone-400 dark:text-stone-500">{a.deadlineHint}</span>
                      <span className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-full">
                        +{a.xp} XP
                      </span>
                    </div>
                  </div>

                  {open && (
                    <div className="mt-2">
                      <p className="text-sm text-stone-500 dark:text-stone-400">{a.description}</p>
                      <ReflectionInput
                        assignmentId={a.id}
                        sectionId={sectionId}
                        initialReflection={completion?.reflection}
                        isCompleted={done}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
