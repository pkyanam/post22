"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { GamificationBar } from "./GamificationBar";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/start", label: "Start" },
  { href: "/stabilize", label: "Stabilize" },
  { href: "/career", label: "Career" },
  { href: "/skills", label: "Skills" },
  { href: "/income", label: "Income" },
  { href: "/daily", label: "Daily" },
  { href: "/resources", label: "Resources" },
  { href: "/dashboard", label: "Dashboard" },
];

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex-shrink-0 text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
    >
      {theme === "light" ? (
        // Moon icon — click to go dark
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon — click to go light
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-stone-900 dark:text-stone-100 font-semibold text-lg tracking-tight hover:text-stone-600 dark:hover:text-stone-400 transition-colors flex-shrink-0">
          post22
        </Link>

        <GamificationBar />

        {/* Right side: desktop nav + theme toggle + mobile hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-stone-900 dark:text-stone-100 font-medium"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => signOut()}
                className="text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link href="/signin" className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                Sign in
              </Link>
            )}
          </nav>

          {/* Theme toggle — always visible */}
          <ThemeToggleButton />

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-950">
          <div className="max-w-3xl mx-auto px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "text-stone-900 dark:text-stone-100 font-medium"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="py-2 text-sm text-left text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
