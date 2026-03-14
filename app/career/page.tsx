import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { SectionProgressBar } from "@/components/SectionProgressBar";
import { AssignmentPanel } from "@/components/AssignmentPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career — post22",
  description: "Explore career paths, do informational interviews, and start your job search.",
};

export default function CareerPage() {
  const content = getContent("career");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionProgressBar sectionId="career" />
      <MarkdownRenderer source={content} />
      <AssignmentPanel sectionId="career" />
    </div>
  );
}
