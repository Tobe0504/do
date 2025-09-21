// Heatmap.jsx
import React, { useState } from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import classes from "./ProjectDashbordHeatmap.module.css";

const ProjectDashboardHeatmap = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());

  // Get number of days in selected month
  const daysInMonth = new Date(today.getFullYear(), month + 1, 0).getDate();

  // Dummy heatmap data: values between 0-2 (Low, Medium, High)
  const heatmapData = Array.from({ length: daysInMonth }, () =>
    Math.floor(Math.random() * 3)
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={classes["heatmap-container"]}>
      <div className={classes["heatmap-header"]}>
        <h3>Project Heatmap</h3>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className={classes["heatmap-grid"]}>
        {heatmapData.map((value, index) => (
          <div
            key={index}
            className={`${classes["heatmap-cell"]} ${
              classes[`level-${value}`]
            }`}
            title={`Day ${index + 1}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className={classes["heatmap-legend"]}>
        <span
          className={`${classes["legend-box"]} ${classes["level-0"]}`}
        ></span>{" "}
        Low
        <span
          className={`${classes["legend-box"]} ${classes["level-1"]}`}
        ></span>{" "}
        Medium
        <span
          className={`${classes["legend-box"]} ${classes["level-2"]}`}
        ></span>{" "}
        High
      </div>
    </div>
  );
};

export default ProjectDashboardHeatmap;
