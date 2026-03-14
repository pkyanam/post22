import Link from "next/link";

const navLinks = [
  { href: "/start", label: "Start" },
  { href: "/stabilize", label: "Stabilize" },
  { href: "/career", label: "Career" },
  { href: "/skills", label: "Skills" },
  { href: "/income", label: "Income" },
  { href: "/daily", label: "Daily" },
  { href: "/resources", label: "Resources" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 mt-24">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-stone-400 dark:text-stone-500">
          post22 — a guide for people in their twenties who feel stuck.
        </p>
      </div>
    </footer>
  );
}
