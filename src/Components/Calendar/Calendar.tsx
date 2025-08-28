import React, { useState } from "react";
import styles from "./Calendar.module.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

interface Props {
  deadlines: { id: number; title: string; date: Date | string }[];
}

const Calendar: React.FC<Props> = ({ deadlines }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const goPrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className={styles.calendar}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={goPrevMonth}>←</button>
        <h3>{format(currentDate, "MMMM yyyy")}</h3>
        <button onClick={goNextMonth}>→</button>
      </div>

      {/* Days */}
      <div className={styles.grid}>
        {days.map((day, idx) => {
          const events = deadlines.filter((d) =>
            isSameDay(new Date(d.date), day)
          );

          return (
            <div
              key={idx}
              className={`${styles.day} ${
                events.length ? styles.hasEvent : ""
              }`}
            >
              <span>{format(day, "d")}</span>

              {/* Event indicator */}
              {events.length > 0 && <div className={styles.dot}></div>}

              {/* Popup tooltip */}
              {events.length > 0 && (
                <div className={styles.tooltip}>
                  {events.map((e) => (
                    <p key={e.id}>{e.title}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
