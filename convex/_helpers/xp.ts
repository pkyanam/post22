export const XP_PER_COMPLETION = 50;
export const XP_PER_REFLECTION = 25;

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 850, 1300, 1850, 2500, 3300, 4200];

export const LEVEL_NAMES = [
  "Newcomer",
  "Starter",
  "Explorer",
  "Builder",
  "Achiever",
  "Momentum",
  "Committed",
  "Advanced",
  "Expert",
  "Master",
];

export function levelForXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
}

export function xpForNextLevel(xp: number): { current: number; needed: number; levelName: string } {
  const level = levelForXp(xp);
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  return {
    current: xp - currentThreshold,
    needed: nextThreshold - currentThreshold,
    levelName: LEVEL_NAMES[level - 1] ?? "Master",
  };
}
