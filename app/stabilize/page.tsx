import { getContent } from "@/lib/getContent";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stabilize — post22",
  description: "Build foundational life structure: sleep, movement, mental health, and habits.",
};

export default function StabilizePage() {
  const content = getContent("stabilize");
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <MarkdownRenderer source={content} />
    </div>
  );
}
