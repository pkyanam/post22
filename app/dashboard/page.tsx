import type { Metadata } from "next";
import { Dashboard } from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — post22",
  description: "Track your progress, XP, streaks, and weekly missions.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-10">Dashboard</h1>
      <Dashboard />
    </div>
  );
}
