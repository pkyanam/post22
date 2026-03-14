export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  targetType:
    | "any_completion"
    | "any_reflection"
    | "section_completion"
    | "multi_section_completion"
    | "same_day_completion";
  targetValue: number;
  targetSection?: string;
  targetSections?: string[];
}

export const WEEKLY_MISSIONS: WeeklyMission[] = [
  {
    id: "wm-1",
    title: "Getting Moving",
    description: "Complete 3 assignments this week",
    xpReward: 150,
    targetType: "any_completion",
    targetValue: 3,
  },
  {
    id: "wm-2",
    title: "Reflective Practice",
    description: "Write a reflection for any assignment",
    xpReward: 75,
    targetType: "any_reflection",
    targetValue: 1,
  },
  {
    id: "wm-3",
    title: "Build the Foundation",
    description: "Complete a Stabilize assignment",
    xpReward: 100,
    targetType: "section_completion",
    targetValue: 1,
    targetSection: "stabilize",
  },
  {
    id: "wm-4",
    title: "Invest in Your Future",
    description: "Complete a Career or Skills assignment",
    xpReward: 100,
    targetType: "multi_section_completion",
    targetValue: 1,
    targetSections: ["career", "skills"],
  },
  {
    id: "wm-5",
    title: "Power Day",
    description: "Complete 2 assignments in a single day",
    xpReward: 125,
    targetType: "same_day_completion",
    targetValue: 2,
  },
];
