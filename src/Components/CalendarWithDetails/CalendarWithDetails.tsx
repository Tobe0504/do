// "use client";
// import React, { useState } from "react";
// import styles from "./CalendarWithDetails.module.css";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   addMonths,
//   subMonths,
//   isSameDay,
//   isSameMonth,
//   eachMonthOfInterval,
// } from "date-fns";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import Button from "../Button/Button";

// interface Task {
//   id: number;
//   title: string;
//   date: Date | string;
//   color?: string; // optional color code
// }

// interface Props {
//   tasks: Task[];
// }

// type ViewMode = "day" | "month" | "year";

// const CalendarWithDetails: React.FC<Props> = ({ tasks }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [view, setView] = useState<ViewMode>("month");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   // Navigate
//   const goPrev = () => {
//     if (view === "month") setCurrentDate(subMonths(currentDate, 1));
//     if (view === "year")
//       setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
//   };

//   const goNext = () => {
//     if (view === "month") setCurrentDate(addMonths(currentDate, 1));
//     if (view === "year")
//       setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
//   };

//   const renderDayView = () => {
//     const dayTasks = tasks.filter((t) =>
//       isSameDay(new Date(t.date), currentDate)
//     );
//     return (
//       <div className={styles.dayView}>
//         <h3>{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
//         {dayTasks.length ? (
//           <ul>
//             {dayTasks.map((task) => (
//               <li
//                 key={task.id}
//                 style={{ borderLeft: `4px solid ${task.color || "#e63e21"}` }}
//               >
//                 {task.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No tasks for today.</p>
//         )}
//       </div>
//     );
//   };

//   const renderMonthView = () => {
//     const start = startOfWeek(startOfMonth(currentDate));
//     const end = endOfWeek(endOfMonth(currentDate));
//     const days = eachDayOfInterval({ start, end });

//     return (
//       <div className={styles.monthView}>
//         <div className={styles.gridHeader}>
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//             <span key={d}>{d}</span>
//           ))}
//         </div>
//         <div className={styles.grid}>
//           {days.map((day, idx) => {
//             const dayTasks = tasks.filter((t) =>
//               isSameDay(new Date(t.date), day)
//             );
//             return (
//               <div
//                 key={idx}
//                 className={`${styles.day} ${
//                   !isSameMonth(day, currentDate) ? styles.inactive : ""
//                 } ${dayTasks.length > 0 ? styles.hasTasks : ""}`}
//                 onClick={() => dayTasks.length > 0 && setSelectedDate(day)}
//               >
//                 <span className={styles.date}>{format(day, "d")}</span>
//                 {dayTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={styles.task}
//                     style={{ backgroundColor: task.color || "#e63e21" }}
//                   >
//                     {task.title}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderYearView = () => {
//     const months = eachMonthOfInterval({
//       start: new Date(currentDate.getFullYear(), 0, 1),
//       end: new Date(currentDate.getFullYear(), 11, 31),
//     });

//     return (
//       <div className={styles.yearView}>
//         {months.map((month, idx) => (
//           <div key={idx} className={styles.monthBox}>
//             <h4>{format(month, "MMMM")}</h4>
//             <div className={styles.miniTasks}>
//               {tasks
//                 .filter(
//                   (t) =>
//                     new Date(t.date).getMonth() === month.getMonth() &&
//                     new Date(t.date).getFullYear() === month.getFullYear()
//                 )
//                 .slice(0, 3) // preview up to 3 tasks
//                 .map((t) => (
//                   <span
//                     key={t.id}
//                     className={styles.taskDot}
//                     style={{ backgroundColor: t.color || "#e63e21" }}
//                   ></span>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderModal = () => {
//     if (!selectedDate) return null;
//     const dayTasks = tasks.filter((t) =>
//       isSameDay(new Date(t.date), selectedDate)
//     );
//     return (
//       <div
//         className={styles.modalOverlay}
//         onClick={() => setSelectedDate(null)}
//       >
//         <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//           <button
//             className={styles.closeButton}
//             onClick={() => setSelectedDate(null)}
//           >
//             <X size={16} />
//           </button>
//           <h3>{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
//           {dayTasks.length ? (
//             <ul>
//               {dayTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   style={{ borderLeft: `4px solid ${task.color || "#e63e21"}` }}
//                 >
//                   {task.title}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No tasks.</p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.calendar}>
//       {/* Header */}
//       <div className={styles.header}>
//         <Button onClick={goPrev} type="tertiary">
//           <ChevronLeft size={16} />
//         </Button>
//         <h3>
//           {view === "day" && format(currentDate, "MMMM d, yyyy")}
//           {view === "month" && format(currentDate, "MMMM yyyy")}
//           {view === "year" && format(currentDate, "yyyy")}
//         </h3>
//         <Button onClick={goNext} type="tertiary">
//           <ChevronRight size={16} />
//         </Button>
//       </div>

//       {/* View Switcher */}
//       <div className={styles.viewSwitcher}>
//         <button
//           className={`${styles.tab} ${view === "day" ? styles.active : ""}`}
//           onClick={() => setView("day")}
//         >
//           Day
//         </button>
//         <button
//           className={`${styles.tab} ${view === "month" ? styles.active : ""}`}
//           onClick={() => setView("month")}
//         >
//           Month
//         </button>
//         <button
//           className={`${styles.tab} ${view === "year" ? styles.active : ""}`}
//           onClick={() => setView("year")}
//         >
//           Year
//         </button>
//       </div>

//       {/* Views */}
//       <div className={styles.content}>
//         {view === "day" && renderDayView()}
//         {view === "month" && renderMonthView()}
//         {view === "year" && renderYearView()}
//       </div>

//       {renderModal()}
//     </div>
//   );
// };

// export default CalendarWithDetails;

"use client";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./CalendarWithDetails.module.css";

type EventColor = "orange" | "gray" | "red" | "purple";

type CalendarEvent = {
  id: string;
  title: string;
  time?: string; // HH:MM or free text like "All day"
  color: EventColor;
  notes?: string;
};

type DayEventsMap = Record<string, CalendarEvent[]>; // key = YYYY-MM-DD

/* ---------- sample data for demonstration ---------- */
const sampleEvents: DayEventsMap = {
  "2025-08-01": [
    {
      id: "e1",
      title: "JAVAT 365 — Sr. Fullstack",
      time: "17:00",
      color: "orange",
    },
  ],
  "2025-08-02": [
    { id: "e2", title: "EDUAID Mobile", time: "15:00 WAT", color: "gray" },
  ],
  "2025-08-07": [
    {
      id: "e3",
      title: "Frontend Sync — Genie",
      time: "13:00",
      color: "orange",
    },
    { id: "e4", title: "Zarttalent Academy", time: "18:00", color: "gray" },
  ],
  "2025-08-29": [
    { id: "e5", title: "Confession & Cleaning", time: "13:00", color: "red" },
  ],
  "2025-09-04": [{ id: "e6", title: "Id el Maulud", color: "purple" }],
  // add more demo events if you like
};

/* ---------- helpers ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
const formatKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();
// Convert JS getDay (0 Sun..6 Sat) to Monday-first index (0 = Mon .. 6 = Sun)
const mondayIndex = (jsDayIndex: number) => (jsDayIndex + 6) % 7;

/* ---------- component ---------- */
const CalendarWithDetails: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 7, 1)); // default Aug 2025 as your screenshot
  const [view, setView] = useState<"day" | "month" | "year">("month");

  // popup states
  const [openDayKey, setOpenDayKey] = useState<string | null>(null); // month-view popup
  const popupRef = useRef<HTMLDivElement | null>(null);

  // day view event popup
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const eventPopupRef = useRef<HTMLDivElement | null>(null);

  // keyboard: esc closes popups
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDayKey(null);
        setOpenEventId(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // close popup on outside click
  useEffect(() => {
    const mdown = (ev: MouseEvent) => {
      const t = ev.target as Node;
      if (popupRef.current && !popupRef.current.contains(t))
        setOpenDayKey(null);
      if (eventPopupRef.current && !eventPopupRef.current.contains(t))
        setOpenEventId(null);
    };
    document.addEventListener("mousedown", mdown);
    return () => document.removeEventListener("mousedown", mdown);
  }, []);

  /* ---------- header actions ---------- */
  const changePrev = () => {
    if (view === "month")
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    if (view === "day")
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 1
        )
      );
    if (view === "year")
      setCurrentDate(
        new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
      );
  };
  const changeNext = () => {
    if (view === "month")
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    if (view === "day")
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        )
      );
    if (view === "year")
      setCurrentDate(
        new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
      );
  };
  const goToday = () =>
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );

  /* ---------- rendering helpers ---------- */
  const renderHeader = () => {
    const title =
      view === "month"
        ? `${currentDate.toLocaleString("default", {
            month: "long",
          })} ${currentDate.getFullYear()}`
        : view === "day"
        ? currentDate.toDateString()
        : `${currentDate.getFullYear()}`;

    return (
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button
            className={styles.iconBtn}
            onClick={changePrev}
            aria-label="Previous"
            type="tertiary"
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            className={styles.iconBtn}
            onClick={changeNext}
            aria-label="Next"
            type="tertiary"
          >
            <ChevronRight size={16} />
          </Button>
          <Button className={styles.todayBtn} onClick={goToday} type="tertiary">
            Today
          </Button>
        </div>

        <div className={styles.title}>
          <h1>{title}</h1>
        </div>

        <div className={styles.viewSwitch}>
          <Button
            className={view === "day" ? styles.activeViewBtn : ""}
            onClick={() => setView("day")}
            type="tertiary"
          >
            Day
          </Button>
          <Button
            className={view === "month" ? styles.activeViewBtn : ""}
            onClick={() => setView("month")}
            type="tertiary"
          >
            Month
          </Button>
          <Button
            className={view === "year" ? styles.activeViewBtn : ""}
            onClick={() => setView("year")}
            type="tertiary"
          >
            Year
          </Button>
        </div>
      </div>
    );
  };

  /* ---------- Month view ---------- */
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const total = daysInMonth(month, year);
    const firstWeekday = mondayIndex(new Date(year, month, 1).getDay()); // 0..6 with Monday start
    const blanks = firstWeekday; // number of empty cells before day 1
    const cells: (number | null)[] = Array.from(
      { length: blanks },
      () => null
    ).concat(Array.from({ length: total }, (_, i) => i + 1) as any);
    // ensure grid always has multiples of 7, fill trailing blanks
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div className={styles.monthView}>
        <div className={styles.weekdays}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
            <div key={w} className={styles.weekday}>
              {w}
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          {cells.map((d, idx) => {
            if (d === null)
              return <div key={idx} className={styles.emptyCell} />;
            const cellDate = new Date(year, month, d);
            const key = formatKey(cellDate);
            const events = sampleEvents[key] || [];
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === d;

            return (
              <div
                key={key}
                className={`${styles.dayCell} ${isToday ? styles.today : ""}`}
                onClick={() => setOpenDayKey(openDayKey === key ? null : key)}
              >
                <div className={styles.dayTop}>
                  <span className={styles.dayNumber}>{d}</span>
                  <div className={styles.eventCount}>
                    {events.length > 0 && (
                      <span className={styles.eventBadge}>{events.length}</span>
                    )}
                  </div>
                </div>

                <div className={styles.previewEvents}>
                  {events.slice(0, 2).map((ev) => (
                    <div key={ev.id} className={styles.previewEvent}>
                      <span
                        className={`${styles.eventDot} ${styles[ev.color]}`}
                      />
                      <span className={styles.previewText}>
                        {ev.title.length > 20
                          ? ev.title.slice(0, 20) + "…"
                          : ev.title}
                      </span>
                    </div>
                  ))}
                </div>

                {openDayKey === key && (
                  <div ref={popupRef} className={styles.popup}>
                    <div className={styles.popupHeader}>
                      <strong>{cellDate.toDateString()}</strong>
                      <Button
                        className={styles.closeBtn}
                        onClick={() => setOpenDayKey(null)}
                        type="tertiary"
                      >
                        <X size={14} />
                      </Button>
                    </div>

                    <div className={styles.popupBody}>
                      {events.length ? (
                        events.map((ev) => (
                          <div key={ev.id} className={styles.popupEvent}>
                            <span
                              className={`${styles.eventDot} ${
                                styles[ev.color]
                              }`}
                            />
                            <div className={styles.popupEventText}>
                              <div className={styles.popupEventTitle}>
                                {ev.time
                                  ? `${ev.time} — ${ev.title}`
                                  : ev.title}
                              </div>
                              {ev.notes && (
                                <div className={styles.popupEventNotes}>
                                  {ev.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noEvents}>No events</div>
                      )}
                    </div>

                    <div className={styles.popupFooter}>
                      <Button
                        className={styles.primaryBtn}
                        type="secondary"
                        onClick={() => {
                          setView("day");
                          setCurrentDate(cellDate);
                          setOpenDayKey(null);
                        }}
                      >
                        <span>View on day view</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ---------- Day view ---------- */
  const renderDayView = () => {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const key = formatKey(dayDate);
    const events = (sampleEvents[key] || []).slice().sort((a, b) => {
      if (!a.time) return -1;
      if (!b.time) return 1;
      return a.time.localeCompare(b.time);
    });

    // hourly timeline from 7am to 22pm
    const hours = Array.from({ length: 16 }, (_, i) => i + 7);

    return (
      <div className={styles.dayViewMain}>
        <div className={styles.dayHeader}>
          <h3>Day — {dayDate.toDateString()}</h3>
          <div className={styles.dayActions}>
            <Button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    dayDate.getFullYear(),
                    dayDate.getMonth(),
                    dayDate.getDate() - 1
                  )
                )
              }
              type="tertiary"
            >
              Prev
            </Button>
            <Button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    dayDate.getFullYear(),
                    dayDate.getMonth(),
                    dayDate.getDate() + 1
                  )
                )
              }
              type="tertiary"
            >
              Next
            </Button>
          </div>
        </div>

        <div className={styles.timeline}>
          <div className={styles.hoursColumn}>
            {hours.map((h) => (
              <div key={h} className={styles.hourLabel}>
                {h}:00
              </div>
            ))}
          </div>

          <div className={styles.eventsColumn}>
            {hours.map((h) => {
              const hourStr = `${pad(h)}:00`;
              const slotEvents = events.filter(
                (ev) =>
                  ev.time && ev.time.startsWith(String(h).padStart(2, "0"))
              );
              return (
                <div key={h} className={styles.hourSlot}>
                  {slotEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={styles.timedEvent}
                      onClick={() =>
                        setOpenEventId(openEventId === ev.id ? null : ev.id)
                      }
                    >
                      <div className={styles.timedLeft}>
                        <span
                          className={`${styles.eventDot} ${styles[ev.color]}`}
                        />
                      </div>
                      <div className={styles.timedRight}>
                        <div className={styles.timedTitle}>{ev.title}</div>
                        <div className={styles.timedTime}>{ev.time}</div>
                      </div>

                      {openEventId === ev.id && (
                        <div ref={eventPopupRef} className={styles.eventPopup}>
                          <div className={styles.eventPopupTitle}>
                            {ev.title}
                          </div>
                          {ev.time && (
                            <div className={styles.eventPopupTime}>
                              {ev.time}
                            </div>
                          )}
                          {ev.notes && (
                            <div className={styles.eventPopupNotes}>
                              {ev.notes}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
            {/* show unscheduled events */}
            <div className={styles.unscheduled}>
              {events
                .filter((e) => !e.time)
                .map((ev) => (
                  <div
                    key={ev.id}
                    className={styles.unscheduledEvent}
                    onClick={() =>
                      setOpenEventId(openEventId === ev.id ? null : ev.id)
                    }
                  >
                    <span
                      className={`${styles.eventDot} ${styles[ev.color]}`}
                    />
                    <span>{ev.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ---------- Year view (accurate small months) ---------- */
  const renderYearView = () => {
    const year = currentDate.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <div className={styles.yearGrid}>
        {months.map((m) => {
          const mFirstJS = new Date(year, m, 1).getDay(); // 0..6 Sun..Sat
          const startBlank = mondayIndex(mFirstJS); // Monday-first blank count
          const totalDays = daysInMonth(m, year);
          const cells: (number | null)[] = Array.from(
            { length: startBlank },
            () => null
          ).concat(Array.from({ length: totalDays }, (_, i) => i + 1) as any);
          while (cells.length % 7 !== 0) cells.push(null);

          // quick count of events in this month
          const monthKeyPrefix = `${year}-${pad(m + 1)}-`;
          const eventCount = Object.keys(sampleEvents).filter((k) =>
            k.startsWith(monthKeyPrefix)
          ).length;

          return (
            <div key={m} className={styles.miniMonthCard}>
              <div className={styles.miniHeader}>
                <button
                  className={styles.miniMonthBtn}
                  onClick={() => {
                    setView("month");
                    setCurrentDate(new Date(year, m, 1));
                  }}
                >
                  {new Date(year, m).toLocaleString("default", {
                    month: "short",
                  })}
                </button>
                {eventCount > 0 && (
                  <span className={styles.miniEventBadge}>{eventCount}</span>
                )}
              </div>

              <div className={styles.miniGrid}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className={styles.miniWeekday}>
                    {d}
                  </div>
                ))}
                {cells.map((c, idx) => {
                  if (c === null)
                    return <div key={idx} className={styles.miniCellEmpty} />;
                  const cellKey = `${year}-${pad(m + 1)}-${pad(c)}`;
                  const hasEvent = (sampleEvents[cellKey] || []).length > 0;
                  return (
                    <div
                      key={cellKey}
                      className={styles.miniCell}
                      onClick={() => {
                        setView("day");
                        setCurrentDate(new Date(year, m, c));
                      }}
                    >
                      <span className={styles.miniCellNumber}>{c}</span>
                      {hasEvent && <span className={styles.miniDot} />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderHeader()}

      <div className={styles.content}>
        {view === "month" && renderMonthView()}
        {view === "day" && renderDayView()}
        {view === "year" && renderYearView()}
      </div>
    </div>
  );
};

export default CalendarWithDetails;
