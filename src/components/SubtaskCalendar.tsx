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
    <div
      style={{
        background: '#F9FAFB',
        borderRadius: '16px',
        padding: '16px 2px',
        marginBottom: '24px',
        border: '1px solid #E8E8F0',
      }}
    >
      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '-12px',
          padding: '0px 12px'
        }}
      >
        <button
          onClick={handlePrevMonth}
          style={{
            background: '#fff',
            border: '1px solid #E8E8F0',
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: "'DM Mono', monospace",
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          ←
        </button>
        <button
          onClick={handleNextMonth}
          style={{
            background: '#fff',
            border: '1px solid #E8E8F0',
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: "'DM Mono', monospace",
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          →
        </button>
      </div>
      {/* Months Grid */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          overflowX: 'visible',
          paddingBottom: '0px',
          justifyContent: 'center',
        }}
      >
        {months.map((monthDate, monthIndex) => {
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const daysInMonth = getDaysInMonth(year, month);
          const firstDayOfMonth = new Date(year, month, 1).getDay();
          const startOffset = firstDayOfMonth; // Sunday = 0

          const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

          return (
            <div key={monthIndex} style={{ minWidth: '310px' }}>
              {/* Month Header */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  fontFamily: "'DM Mono', monospace",
                  color: '#6B7280',
                  marginBottom: '8px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                {monthName}
              </div>

              {/* Day Labels */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '2px',
                  marginBottom: '4px',
                }}
              >
                {dayLabels.map((label, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '10px',
                      fontFamily: "'DM Mono', monospace",
                      color: '#9CA3AF',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '2px',
                }}
              >
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
                      style={{
                        width: '42px',
                        height: '42px',
                        position: 'relative',
                        background: isToday ? '#EEF2FF' : 'transparent',
                        borderRadius: '4px',
                      }}
                    >
                      {/* Day number */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '12px',
                          fontFamily: "'DM Mono', monospace",
                          color: isToday ? '#4F46E5' : '#6B7280',
                          fontWeight: isToday ? '700' : '400',
                        }}
                      >
                        {day}
                      </div>

                      {/* Subtask indicators */}
                      {subtasksForDate.length > 0 && (
                        <div
                          style={{
                            position: 'relative',
                            bottom: '4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '3px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            maxWidth: '38px',
                          }}
                        >
                          {subtasksForDate.map((info, i) => (
                            <div
                              key={i}
                              onMouseEnter={(e) => handleMouseEnter(dateKey + '__' + i, e)}
                              onMouseLeave={handleMouseLeave}
                              style={{
                                width: '12px',
                                height: '12px',
                                background: info.color,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '7px',
                                fontWeight: '700',
                                color: '#fff',
                                fontFamily: "'DM Mono', monospace",
                                position: 'relative',
                              }}
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
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
            background: '#fff',
            border: '1px solid #E8E8F0',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '300px',
            zIndex: 1000,
            pointerEvents: 'none',
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
                    style={{
                      marginBottom: i < info.subtasks.length - 1 ? '8px' : '0',
                      paddingBottom: i < info.subtasks.length - 1 ? '8px' : '0',
                      borderBottom: i < info.subtasks.length - 1 ? '1px solid #E8E8F0' : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        fontFamily: "'Sora', sans-serif",
                        color: '#1F2937',
                        marginBottom: '2px',
                      }}
                    >
                      {subtask.initiativeTitle}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Inter', sans-serif",
                        color: '#6B7280',
                        marginBottom: '2px',
                      }}
                    >
                      {subtask.taskTitle}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Inter', sans-serif",
                        color: '#374151',
                      }}
                    >
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
