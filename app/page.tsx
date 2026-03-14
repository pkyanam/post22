import Link from "next/link";
import { HomeSectionCard } from "@/components/HomeSectionCard";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
          post22
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
          A simple guide for people in their twenties who feel stuck.
        </p>
      </div>

      {/* Explanation */}
      <div className="mb-12 space-y-4 max-w-xl">
        <p className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed">
          College provides structure. Life after it usually does not.
        </p>
        <p className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed">
          post22 is a curated set of resources and steps to help rebuild
          direction, skills, and income.
        </p>
      </div>

      {/* CTA */}
      <div className="mb-20">
        <Link
          href="/start"
          className="inline-flex items-center gap-2 text-lg font-medium text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 pb-0.5 hover:text-stone-600 dark:hover:text-stone-400 hover:border-stone-600 dark:hover:border-stone-400 transition-colors"
        >
          Start Here
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <HomeSectionCard
          href="/stabilize"
          sectionId="stabilize"
          title="Stabilize"
          desc="Sleep, movement, and basic structure first."
        />
        <HomeSectionCard
          href="/career"
          sectionId="career"
          title="Career"
          desc="Explore directions and talk to people."
        />
        <HomeSectionCard
          href="/skills"
          sectionId="skills"
          title="Skills"
          desc="High-value skills with free learning paths."
        />
        <HomeSectionCard
          href="/income"
          sectionId="income"
          title="Income"
          desc="Freelance, remote work, and portfolios."
        />
        <HomeSectionCard
          href="/daily"
          sectionId="daily"
          title="Daily Reset"
          desc="A simple daily structure to stay in motion."
        />
        <Link
          href="/resources"
          className="block p-5 border border-stone-200 dark:border-stone-700 rounded-lg hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
        >
          <div className="font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:text-stone-700 dark:group-hover:text-stone-300">Resources</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">All curated links in one place.</div>
        </Link>
      </div>
    </div>
  );
}
