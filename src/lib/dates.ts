/**
 * Company's "years active" counter starts from 1 Shahrivar 1404 (2025-08-23)
 * and rolls over by one on each anniversary of that date.
 */
const ACTIVITY_ANCHOR = new Date(2025, 7, 23); // month is 0-indexed: 7 = August

export function getYearsActive(now: Date = new Date()): number {
  let years = now.getFullYear() - ACTIVITY_ANCHOR.getFullYear();
  const beforeAnniversaryThisYear =
    now.getMonth() < ACTIVITY_ANCHOR.getMonth() ||
    (now.getMonth() === ACTIVITY_ANCHOR.getMonth() && now.getDate() < ACTIVITY_ANCHOR.getDate());
  if (beforeAnniversaryThisYear) years -= 1;
  return Math.max(years, 0);
}
