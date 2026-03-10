const CURRENT_DATE = new Date();

export function parseDue(dueStr: string | undefined): Date | null {
  if (!dueStr) return null;
  const currentYear = new Date().getFullYear();
  const withYear = dueStr.includes(",") ? dueStr : `${dueStr}, ${currentYear}`;
  const d = new Date(withYear);
  return isNaN(d.getTime()) ? null : d;
}

export function getDaysUntil(dueStr: string | undefined): number | null {
  const d = parseDue(dueStr);
  if (!d) return null;
  return Math.ceil((d.getTime() - CURRENT_DATE.getTime()) / (1000 * 60 * 60 * 24));
}
