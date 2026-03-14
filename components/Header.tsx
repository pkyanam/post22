"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { GamificationBar } from "./GamificationBar";

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

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-stone-900 font-semibold text-lg tracking-tight hover:text-stone-600 transition-colors flex-shrink-0">
          post22
        </Link>

        <GamificationBar />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-stone-900 font-medium"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
            >
              Sign out
            </button>
          ) : (
            <Link href="/signin" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-stone-500 hover:text-stone-800 transition-colors"
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

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-stone-100 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "text-stone-900 font-medium"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="py-2 text-sm text-left text-stone-400 hover:text-stone-700 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
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
