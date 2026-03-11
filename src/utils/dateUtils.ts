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

// Calendar helper functions
export function getMonthRange(startDate: Date, monthCount: number): Date[] {
  const months: Date[] = [];
  for (let i = 0; i < monthCount; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    months.push(date);
  }
  return months;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
