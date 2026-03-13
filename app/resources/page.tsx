import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — post22",
  description: "All curated tools and links grouped by category: learning, jobs, productivity, and more.",
};

export default function ResourcesPage() {
  const content = getContent("resources");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <MarkdownRenderer source={content} />
    </div>
  );
}
