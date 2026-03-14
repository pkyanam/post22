import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { SectionProgressBar } from "@/components/SectionProgressBar";
import { AssignmentPanel } from "@/components/AssignmentPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income — post22",
  description: "Freelancing, remote jobs, contracts, and building a portfolio to start earning.",
};

export default function IncomePage() {
  const content = getContent("income");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionProgressBar sectionId="income" />
      <MarkdownRenderer source={content} />
      <AssignmentPanel sectionId="income" />
    </div>
  );
}
