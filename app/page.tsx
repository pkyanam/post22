import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
          post22
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-xl">
          A simple guide for people in their twenties who feel stuck.
        </p>
      </div>

      {/* Explanation */}
      <div className="mb-12 space-y-4 max-w-xl">
        <p className="text-stone-700 text-lg leading-relaxed">
          College provides structure. Life after it usually does not.
        </p>
        <p className="text-stone-700 text-lg leading-relaxed">
          post22 is a curated set of resources and steps to help rebuild
          direction, skills, and income.
        </p>
      </div>

      {/* CTA */}
      <div className="mb-20">
        <Link
          href="/start"
          className="inline-flex items-center gap-2 text-lg font-medium text-stone-900 border-b-2 border-stone-900 pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-colors"
        >
          Start Here
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            href: "/stabilize",
            title: "Stabilize",
            desc: "Sleep, movement, and basic structure first.",
          },
          {
            href: "/career",
            title: "Career",
            desc: "Explore directions and talk to people.",
          },
          {
            href: "/skills",
            title: "Skills",
            desc: "High-value skills with free learning paths.",
          },
          {
            href: "/income",
            title: "Income",
            desc: "Freelance, remote work, and portfolios.",
          },
          {
            href: "/daily",
            title: "Daily Reset",
            desc: "A simple daily structure to stay in motion.",
          },
          {
            href: "/resources",
            title: "Resources",
            desc: "All curated links in one place.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-5 border border-stone-200 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-colors group"
          >
            <div className="font-medium text-stone-900 mb-1 group-hover:text-stone-700">
              {item.title}
            </div>
            <div className="text-sm text-stone-500">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
