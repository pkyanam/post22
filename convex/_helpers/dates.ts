/** Returns "YYYY-MM-DD" for a given epoch ms (UTC). */
export function toDateString(epochMs: number): string {
  return new Date(epochMs).toISOString().slice(0, 10);
}

/** Returns the Monday and Sunday of an ISO week given a weekKey like "2025-W12". */
export function getWeekBounds(weekKey: string): { start: string; end: string } {
  const [yearStr, weekStr] = weekKey.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);

  // ISO 8601: week 1 contains the first Thursday of the year.
  // Find Jan 4 (always in week 1), then get its Monday.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = jan4.getUTCDay() || 7; // make Sunday = 7
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - (dayOfWeek - 1));

  const monday = new Date(week1Monday);
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7);

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  return {
    start: monday.toISOString().slice(0, 10),
    end: sunday.toISOString().slice(0, 10),
  };
}
