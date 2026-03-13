import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income — post22",
  description: "Freelancing, remote jobs, contracts, and building a portfolio to start earning.",
};

export default function IncomePage() {
  const content = getContent("income");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <MarkdownRenderer source={content} />
    </div>
  );
}
