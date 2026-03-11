import { useState, useMemo } from 'react';
import type { Project } from '../data/projects';
import { aggregateSubtasksByDate } from '../utils/calendarUtils';
import type { SubtaskDateInfo } from '../utils/calendarUtils';
import { getMonthRange, getDaysInMonth, formatDateKey } from '../utils/dateUtils';

interface SubtaskCalendarProps {
  projects: Project[];
  selectedProjectId: string;
}

export function SubtaskCalendar({ projects, selectedProjectId }: SubtaskCalendarProps) {
  const today = new Date();
  const [startMonth, setStartMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hoveredDateKey, setHoveredDateKey] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Memoize subtask aggregation for performance
  const subtaskData = useMemo(
    () => aggregateSubtasksByDate(projects, selectedProjectId),
    [projects, selectedProjectId]
  );

  // Create a map for quick date lookups
  const dateMap = useMemo(() => {
    const map = new Map<string, SubtaskDateInfo[]>();
    subtaskData.forEach((info) => {
      if (!map.has(info.date)) {
        map.set(info.date, []);
      }
      map.get(info.date)!.push(info);
    });
    return map;
  }, [subtaskData]);

  // Generate 3 visible months
  const months = getMonthRange(startMonth, 3);

  const handlePrevMonth = () => {
    setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() + 1, 1));
  };

  const handleMouseEnter = (dateKey: string, event: React.MouseEvent) => {
    setHoveredDateKey(dateKey);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDateKey(null);
    setTooltipPosition(null);
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="calendar-container">
      {/* Navigation Controls */}
      <div className="calendar-nav">
        <button
          onClick={handlePrevMonth}
          className="btn-calendar-nav"
        >
          ←
        </button>
        <button
          onClick={handleNextMonth}
          className="btn-calendar-nav"
        >
          →
        </button>
      </div>
      {/* Months Grid */}
      <div className="calendar-months">
        {months.map((monthDate, monthIndex) => {
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const daysInMonth = getDaysInMonth(year, month);
          const firstDayOfMonth = new Date(year, month, 1).getDay();
          const startOffset = firstDayOfMonth; // Sunday = 0

          const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

          return (
            <div key={monthIndex} className="calendar-month">
              {/* Month Header */}
              <div className="calendar-month-header">
                {monthName}
              </div>

              {/* Day Labels */}
              <div className="calendar-day-labels">
                {dayLabels.map((label, i) => (
                  <div key={i} className="calendar-day-label">
                    {label}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Empty cells for days before month start */}
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ width: '42px', height: '42px' }} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                  const day = dayIndex + 1;
                  const date = new Date(year, month, day);
                  const dateKey = formatDateKey(date);
                  const subtasksForDate = dateMap.get(dateKey) || [];

                  const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                  return (
                    <div
                      key={dayIndex}
                      className={`calendar-day ${isToday ? 'calendar-day-today' : ''}`}
                    >
                      {/* Day number */}
                      <div className={`calendar-day-number ${isToday ? 'calendar-day-number-today' : ''}`}>
                        {day}
                      </div>

                      {/* Subtask indicators */}
                      {subtasksForDate.length > 0 && (
                        <div className="calendar-subtask-indicators">
                          {subtasksForDate.map((info, i) => (
                            <div
                              key={i}
                              onMouseEnter={(e) => handleMouseEnter(dateKey + '__' + i, e)}
                              onMouseLeave={handleMouseLeave}
                              className="calendar-subtask-dot"
                              style={{ background: info.color }}
                            >
                              {info.count > 1 ? info.count : ''}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredDateKey && tooltipPosition && (
        <div
          className="tooltip"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
          }}
        >
          {(() => {
            const [dateKey, indexStr] = hoveredDateKey.split('__');
            const index = parseInt(indexStr, 10);
            const subtasksForDate = dateMap.get(dateKey) || [];
            const info = subtasksForDate[index];

            if (!info) return null;

            return (
              <div>
                {info.subtasks.map((subtask, i) => (
                  <div
                    key={i}
                    className={`tooltip-item ${i < info.subtasks.length - 1 ? 'tooltip-item-border' : ''}`}
                  >
                    <div className="tooltip-title">
                      {subtask.initiativeTitle}
                    </div>
                    <div className="tooltip-task">
                      {subtask.taskTitle}
                    </div>
                    <div className="tooltip-subtask">
                      • {subtask.text}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
