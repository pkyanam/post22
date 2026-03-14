import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { SectionProgressBar } from "@/components/SectionProgressBar";
import { AssignmentPanel } from "@/components/AssignmentPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stabilize — post22",
  description: "Build foundational life structure: sleep, movement, mental health, and habits.",
};

export default function StabilizePage() {
  const content = getContent("stabilize");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionProgressBar sectionId="stabilize" />
      <MarkdownRenderer source={content} />
      <AssignmentPanel sectionId="stabilize" />
    </div>
  );
}
