import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownRendererProps {
  source: string;
}

export default function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return (
    <div className="prose prose-stone prose-lg max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:mb-8
      prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-stone-700 prose-p:leading-relaxed
      prose-a:text-stone-900 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-stone-400 hover:prose-a:decoration-stone-800
      prose-strong:text-stone-900 prose-strong:font-semibold
      prose-li:text-stone-700
      prose-blockquote:border-l-2 prose-blockquote:border-stone-300 prose-blockquote:text-stone-500 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:not-italic
      prose-hr:border-stone-200
      prose-table:text-sm
      prose-th:text-stone-900 prose-th:font-semibold
      prose-td:text-stone-700
    ">
      <MDXRemote source={source} />
    </div>
  );
}
