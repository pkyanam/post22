import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills — post22",
  description: "High-value skills with free learning paths: programming, design, writing, and more.",
};

export default function SkillsPage() {
  const content = getContent("skills");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <MarkdownRenderer source={content} />
    </div>
  );
}
