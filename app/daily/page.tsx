import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { SectionProgressBar } from "@/components/SectionProgressBar";
import { AssignmentPanel } from "@/components/AssignmentPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Reset — post22",
  description: "A simple daily structure: move, learn, apply, and reach out.",
};

export default function DailyPage() {
  const content = getContent("daily");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionProgressBar sectionId="daily" />
      <MarkdownRenderer source={content} />
      <AssignmentPanel sectionId="daily" />
    </div>
  );
}
