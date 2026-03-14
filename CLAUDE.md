# CLAUDE.md — AI Assistant Guide for post22

## Project Overview

**post22** is a gamified self-improvement platform for people in their 20s. It features 6 content sections with assignments, an RPG-style XP/leveling system, daily streaks, and weekly missions, all backed by Google OAuth authentication.

**Live tech stack:** Next.js 16 (App Router) + React 19 + TypeScript + Convex (BaaS) + Tailwind CSS v4

---

## Repository Structure

```
post22/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (auth provider, header, footer)
│   ├── page.tsx            # Landing page
│   ├── start/              # /start route
│   ├── stabilize/          # /stabilize route
│   ├── career/             # /career route
│   ├── skills/             # /skills route
│   ├── income/             # /income route
│   ├── daily/              # /daily route
│   ├── resources/          # /resources route
│   ├── signin/             # /signin route (Google OAuth)
│   └── dashboard/          # /dashboard route (authenticated)
├── components/             # Shared React components
│   ├── Header.tsx          # Navigation + mobile menu + gamification bar
│   ├── Footer.tsx          # Site footer
│   ├── Dashboard.tsx       # User stats, XP, streaks, progress
│   ├── AssignmentPanel.tsx # Assignment checklist UI
│   ├── GamificationBar.tsx # XP/level/streak display in header
│   ├── WeeklyMissions.tsx  # Weekly mission tracker
│   ├── ReflectionInput.tsx # Reflection text editor
│   ├── MarkdownRenderer.tsx# MDX content renderer
│   ├── SectionProgressBar.tsx # Progress indicator
│   ├── HomeSectionCard.tsx # Section cards on homepage
│   └── ConvexClientProvider.tsx # Convex auth wrapper
├── convex/                 # Backend (Convex functions + schema)
│   ├── schema.ts           # Database table definitions
│   ├── auth.ts             # Google OAuth setup
│   ├── auth.config.ts      # Auth configuration
│   ├── users.ts            # User progress queries/mutations
│   ├── completions.ts      # Assignment completion mutations
│   ├── weeklyMissions.ts   # Weekly mission progress queries
│   ├── http.ts             # HTTP routing
│   ├── _helpers/
│   │   ├── xp.ts           # XP thresholds, level definitions (10 levels)
│   │   └── dates.ts        # ISO week/date utilities
│   └── _generated/         # Auto-generated Convex API types (do not edit)
├── lib/                    # Client-side utilities
│   ├── assignments.ts      # 30 assignments across 6 sections
│   ├── missions.ts         # 5 weekly mission definitions
│   ├── dateUtils.ts        # ISO week calculation
│   └── getContent.ts       # Markdown content file loader
├── content/                # Markdown content for each section
│   ├── start.md
│   ├── stabilize.md
│   ├── career.md
│   ├── skills.md
│   ├── income.md
│   ├── daily.md
│   └── resources.md
├── public/                 # Static assets (SVG icons)
├── proxy.ts                # Auth middleware (redirects signin↔dashboard)
├── next.config.ts          # Next.js config (React Compiler enabled)
├── tsconfig.json           # TypeScript config (strict, path alias @/*)
├── postcss.config.mjs      # PostCSS/Tailwind config
└── eslint.config.mjs       # ESLint config (Next.js + TypeScript rules)
```

---

## Development Commands

```bash
# Start both Next.js dev server and Convex backend together (preferred)
npm run dev:all

# Start only Next.js dev server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

> Always use `npm run dev:all` during development — Convex requires its own dev process running alongside Next.js.

---

## Environment Variables

The following environment variables are required but not committed to the repo:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment endpoint |
| `CONVEX_DEPLOYMENT` | Convex project/deployment ID |
| `CONVEX_SITE_URL` | Base URL for OAuth redirects |
| Google OAuth credentials | Configured via Convex auth dashboard |

Set these in `.env.local` (already in `.gitignore`). Refer to the [Convex docs](https://docs.convex.dev) and `convex/auth.config.ts` for auth setup.

---

## Architecture Decisions

### Frontend: Next.js App Router
- All routes live in `app/`. Each section page (`/stabilize`, `/career`, etc.) follows the same pattern: load markdown content via `lib/getContent.ts` and render assignments via `AssignmentPanel`.
- Path alias `@/*` maps to the project root — use it for all internal imports.
- React Compiler is enabled (`next.config.ts`). Do not manually memoize components unless profiling shows a clear need.

### Backend: Convex
- Convex is the sole backend. It handles the database, authentication, and server-side logic.
- All backend code lives in `convex/`. Files export Convex `query` and `mutation` functions.
- Types in `convex/_generated/` are auto-generated — never edit them manually. Run `npx convex dev` to regenerate.
- The Convex schema (`convex/schema.ts`) uses a declarative approach; no migration files exist. Schema changes are applied automatically by Convex.

### Authentication
- Google OAuth via `@convex-dev/auth`.
- `proxy.ts` (Next.js middleware) handles redirects: authenticated users hitting `/signin` are sent to `/dashboard`; unauthenticated users hitting `/dashboard` are sent to `/signin`.
- Auth state is provided to the React tree via `ConvexClientProvider`.

### Styling: Tailwind CSS v4
- Tailwind v4 uses `@tailwindcss/postcss` (no `tailwind.config.js` needed).
- Global styles are in `app/globals.css`.
- `@tailwindcss/typography` is used for markdown-rendered content (via `prose` classes in `MarkdownRenderer`).

---

## Database Schema

### `userProgress`
Tracks gamification state per user.

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `id("users")` | Foreign key to auth user |
| `streak` | `number` | Current day streak count |
| `totalXp` | `number` | Cumulative XP earned |
| `level` | `number` | Current level (1–10) |
| `lastActiveDate` | `string` | Last active date as "YYYY-MM-DD" |

Index: `by_userId`

### `completions`
Records each assignment a user has completed.

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `id("users")` | Foreign key to auth user |
| `assignmentId` | `string` | e.g. `"stabilize-1"` |
| `sectionId` | `string` | e.g. `"stabilize"`, `"career"` |
| `reflection` | `string?` | Optional user reflection text |
| `completedAt` | `number` | Epoch milliseconds |
| `completedDate` | `string` | "YYYY-MM-DD" |

Indexes: `by_userId`, `by_userId_and_section`

---

## Gamification System

### XP and Levels (`convex/_helpers/xp.ts`)
- 10 levels from Newcomer (level 1) to Master (level 10)
- XP thresholds span 0 to 4200 XP
- Each assignment awards **50 XP** upon completion

### Assignments (`lib/assignments.ts`)
- 30 total assignments across 6 sections: `stabilize`, `career`, `skills`, `income`, `daily`, `resources`
- Assignment IDs follow the pattern `"<sectionId>-<number>"` (e.g. `"career-3"`)

### Weekly Missions (`lib/missions.ts`, `convex/weeklyMissions.ts`)
- 5 weekly missions, each with a unique XP reward (75–150 XP)
- Progress is calculated server-side based on completions within the current ISO week

### Streaks
- Tracked in `userProgress.streak`
- Updated server-side in Convex mutations when a user completes an assignment
- Based on `lastActiveDate` comparison to today's date (ISO format)

---

## Content System

Each section page loads its content from `content/<section>.md` via `lib/getContent.ts`. The markdown is rendered client-side using `next-mdx-remote` through `MarkdownRenderer.tsx`.

To update section content, edit the corresponding `.md` file in `content/`. No code changes needed.

---

## Key Conventions

### TypeScript
- Strict mode is enabled — no `any` types without justification.
- Use the `@/` path alias for all internal imports (e.g., `import { assignments } from "@/lib/assignments"`).
- Convex-generated types from `convex/_generated/` must be used for all database interactions.

### Convex Functions
- Queries use `query()` — read-only, cached, reactive.
- Mutations use `mutation()` — write operations, transactional.
- Use `v` from `"convex/values"` for argument validation schemas.
- Always validate arguments in Convex functions using `args: { ... }`.

### React Components
- Co-locate component-specific logic with the component file.
- Use `"use client"` directive only when needed (interactivity, hooks, browser APIs).
- Server Components (no directive) are the default in the App Router.

### Naming
- Files: PascalCase for components (`AssignmentPanel.tsx`), camelCase for utilities (`dateUtils.ts`).
- Convex function files: camelCase (`weeklyMissions.ts`).
- Assignment IDs: `"<sectionId>-<number>"` (kebab-case).
- Section IDs: lowercase single word (`"stabilize"`, `"career"`, etc.).

### Styling
- Use Tailwind utility classes directly in JSX — no separate CSS modules.
- Follow existing patterns for responsive design (mobile-first, `sm:`, `md:`, `lg:` breakpoints).

---

## Adding a New Section

1. Add a new folder under `app/` (e.g., `app/newSection/`).
2. Add a `page.tsx` following the pattern of existing section pages.
3. Add a `content/newSection.md` with the section content.
4. Add assignments to `lib/assignments.ts` with IDs `"newSection-1"`, `"newSection-2"`, etc.
5. Add a card to the homepage in `app/page.tsx`.
6. Add the route to the navigation in `components/Header.tsx`.

---

## No Test Suite

There are currently no automated tests. When adding tests, consider Vitest with React Testing Library for components and Convex's built-in test utilities for backend functions.

---

## Common Pitfalls

- **Never edit `convex/_generated/`** — these files are auto-generated by `npx convex dev`.
- **Run both processes** — `next dev` alone won't connect to Convex; use `npm run dev:all`.
- **Convex functions are not API routes** — they are called via the Convex client SDK, not via `fetch`.
- **Auth is Convex-managed** — do not implement custom auth logic; use `@convex-dev/auth` primitives.
- **Tailwind v4 has no config file** — configuration is done via CSS variables in `globals.css`, not `tailwind.config.js`.
