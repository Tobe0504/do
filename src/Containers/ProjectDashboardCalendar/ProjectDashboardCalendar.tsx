import classes from "./ProjectDashboardCalendar.module.css";
import CalendarWithDetails from "../../Components/CalendarWithDetails/CalendarWithDetails";

// Utils
const tasks = [
  { id: 1, title: "Team Meeting", date: "2025-08-28", color: "#e63e21" },
  {
    id: 1,
    title: "Team Dancing sessions",
    date: "2025-08-28",
    color: "#9b59b6",
  },
  { id: 2, title: "Submit Report", date: "2025-08-29", color: "#4a90e2" },
  { id: 3, title: "Design Review", date: "2025-08-29", color: "#9b59b6" },
  { id: 4, title: "Client Call", date: "2025-09-03", color: "#ffcc00" },
];

const ProjectDashboardCalendar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4>Project Calendar</h4>
      </div>
      <CalendarWithDetails
      // tasks={tasks}
      />
    </div>
  );
};

export default ProjectDashboardCalendar;
