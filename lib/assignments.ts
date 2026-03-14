export interface Assignment {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  xp: number;
  deadlineHint: string;
}

export const ASSIGNMENTS: Assignment[] = [
  // Stabilize
  {
    id: "stabilize-1",
    sectionId: "stabilize",
    title: "Track your sleep for 7 days",
    description: "Log your sleep and wake times every day for a week. Notice patterns.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "stabilize-2",
    sectionId: "stabilize",
    title: "Build a morning routine",
    description: "Design and follow a 30-min morning routine for 5 consecutive days.",
    xp: 50,
    deadlineHint: "5-day streak",
  },
  {
    id: "stabilize-3",
    sectionId: "stabilize",
    title: "Add 20 min of daily movement",
    description: "Walk, stretch, or exercise for at least 20 minutes each day for 7 days.",
    xp: 50,
    deadlineHint: "7-day streak",
  },
  {
    id: "stabilize-4",
    sectionId: "stabilize",
    title: "Do a weekly review",
    description: "Spend 30 minutes reviewing your week: what worked, what didn't, what to change.",
    xp: 50,
    deadlineHint: "End of week",
  },
  {
    id: "stabilize-5",
    sectionId: "stabilize",
    title: "Identify 3 stress triggers",
    description: "Write down 3 recurring situations that increase your stress and one response strategy for each.",
    xp: 50,
    deadlineHint: "This week",
  },

  // Career
  {
    id: "career-1",
    sectionId: "career",
    title: "Write your professional summary",
    description: "Draft a 3-5 sentence professional summary that captures who you are and what you offer.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "career-2",
    sectionId: "career",
    title: "Do 3 informational interviews",
    description: "Reach out and speak with 3 people working in roles or industries that interest you.",
    xp: 50,
    deadlineHint: "This month",
  },
  {
    id: "career-3",
    sectionId: "career",
    title: "Identify 5 target companies",
    description: "Research and list 5 companies where you'd genuinely want to work and why.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "career-4",
    sectionId: "career",
    title: "Update your LinkedIn profile",
    description: "Fill in all sections, add a photo, and write a compelling headline and about section.",
    xp: 50,
    deadlineHint: "Today",
  },
  {
    id: "career-5",
    sectionId: "career",
    title: "Track 10 job applications",
    description: "Apply to 10 positions and log each in a spreadsheet with company, role, date, and status.",
    xp: 50,
    deadlineHint: "This month",
  },

  // Skills
  {
    id: "skills-1",
    sectionId: "skills",
    title: "Choose 1 skill to focus on for 30 days",
    description: "Pick one high-value skill and commit to learning it for 30 days. Write down why you chose it.",
    xp: 50,
    deadlineHint: "Today",
  },
  {
    id: "skills-2",
    sectionId: "skills",
    title: "Complete a free course or tutorial",
    description: "Finish at least one free online course or structured tutorial in your chosen skill area.",
    xp: 50,
    deadlineHint: "This month",
  },
  {
    id: "skills-3",
    sectionId: "skills",
    title: "Build a portfolio project",
    description: "Create one tangible project that demonstrates your skill. Publish it publicly if possible.",
    xp: 50,
    deadlineHint: "This month",
  },
  {
    id: "skills-4",
    sectionId: "skills",
    title: "Get feedback on your work",
    description: "Share your project or work with at least 2 people and collect written feedback.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "skills-5",
    sectionId: "skills",
    title: "Teach someone what you learned",
    description: "Explain a concept you learned to someone else — in person, in writing, or via a short video.",
    xp: 50,
    deadlineHint: "This month",
  },

  // Income
  {
    id: "income-1",
    sectionId: "income",
    title: "Create a freelancer profile",
    description: "Set up a profile on Upwork, Toptal, or a relevant platform with a bio and portfolio.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "income-2",
    sectionId: "income",
    title: "Send your first cold pitch",
    description: "Write and send a personalized outreach email or DM to a potential client or employer.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "income-3",
    sectionId: "income",
    title: "Price your services",
    description: "Research rates for your skill area and set a clear pricing structure for your services.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "income-4",
    sectionId: "income",
    title: "Land your first client or gig",
    description: "Close your first paid engagement, even if small. Document the experience.",
    xp: 50,
    deadlineHint: "This month",
  },
  {
    id: "income-5",
    sectionId: "income",
    title: "Build a simple portfolio page",
    description: "Create a one-page website or Notion page showcasing your work, skills, and contact info.",
    xp: 50,
    deadlineHint: "This week",
  },

  // Daily
  {
    id: "daily-1",
    sectionId: "daily",
    title: "Follow the daily reset for 5 consecutive days",
    description: "Complete the full daily reset routine 5 days in a row without skipping.",
    xp: 50,
    deadlineHint: "5-day streak",
  },
  {
    id: "daily-2",
    sectionId: "daily",
    title: "Log daily energy levels for a week",
    description: "Rate your energy (1–5) at morning, afternoon, and evening every day for 7 days.",
    xp: 50,
    deadlineHint: "7-day streak",
  },
  {
    id: "daily-3",
    sectionId: "daily",
    title: "Complete 3 daily resets with reflection",
    description: "Do the daily reset and write a short reflection (3+ sentences) for 3 different days.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "daily-4",
    sectionId: "daily",
    title: "Set and review weekly goals",
    description: "On Monday, write 3 goals for the week. On Sunday, review how they went.",
    xp: 50,
    deadlineHint: "This week",
  },
  {
    id: "daily-5",
    sectionId: "daily",
    title: "Build a weekly accountability ritual",
    description: "Share your weekly goals and results with one person — a friend, mentor, or online community.",
    xp: 50,
    deadlineHint: "Weekly",
  },
];

export const ASSIGNMENTS_BY_SECTION: Record<string, Assignment[]> = {};
for (const a of ASSIGNMENTS) {
  if (!ASSIGNMENTS_BY_SECTION[a.sectionId]) {
    ASSIGNMENTS_BY_SECTION[a.sectionId] = [];
  }
  ASSIGNMENTS_BY_SECTION[a.sectionId].push(a);
}
