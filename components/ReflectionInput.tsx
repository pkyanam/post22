"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Props {
  assignmentId: string;
  sectionId: string;
  initialReflection?: string;
  isCompleted: boolean;
}

export function ReflectionInput({ assignmentId, sectionId, initialReflection, isCompleted }: Props) {
  const [text, setText] = useState(initialReflection ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const markComplete = useMutation(api.completions.markComplete);
  const updateReflection = useMutation(api.completions.updateReflection);

  async function handleSave() {
    setSaving(true);
    try {
      if (!isCompleted) {
        await markComplete({ assignmentId, sectionId, reflection: text });
      } else {
        await updateReflection({ assignmentId, sectionId, reflection: text });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setSaved(false); }}
        placeholder="Write a reflection… (earns bonus XP)"
        rows={3}
        className="w-full text-sm border border-stone-200 dark:border-stone-700 rounded-md px-3 py-2 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-400 dark:focus:border-stone-500 resize-none"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="text-xs font-medium px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-md hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : saved ? "Saved!" : isCompleted ? "Update reflection" : "Save & complete"}
      </button>
    </div>
  );
}
