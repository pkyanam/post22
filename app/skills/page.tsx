import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { SectionProgressBar } from "@/components/SectionProgressBar";
import { AssignmentPanel } from "@/components/AssignmentPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills — post22",
  description: "High-value skills with free learning paths: programming, design, writing, and more.",
};

export default function SkillsPage() {
  const content = getContent("skills");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionProgressBar sectionId="skills" />
      <MarkdownRenderer source={content} />
      <AssignmentPanel sectionId="skills" />
    </div>
  );
}
