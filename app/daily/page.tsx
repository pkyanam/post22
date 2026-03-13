import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Reset — post22",
  description: "A simple daily structure: move, learn, apply, and reach out.",
};

export default function DailyPage() {
  const content = getContent("daily");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <MarkdownRenderer source={content} />
    </div>
  );
}
