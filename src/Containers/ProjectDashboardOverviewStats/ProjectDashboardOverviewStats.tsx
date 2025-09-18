import Calendar from "../../Components/Calendar/Calendar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import ProjectDashboardOverviewStatsIssues from "../ProjectDashboardOverviewStatsIssues/ProjectDashboardOverviewStatsIssues";
import classes from "./ProjectDashboardOverviewStats.module.css";

const deadlines = [
  { id: 1, title: "Project Alpha Deadline", date: "2025-08-28" },
  { id: 2, title: "UI Review", date: "2025-09-02" },
  { id: 3, title: "Backend API Release", date: "2025-09-10" },
  { id: 4, title: "Client Demo", date: "2025-09-15" },
];

export const risks = [
  {
    id: 1,
    title: "Dependency on third-party API",
    description:
      "If the vendor API fails, core functionality will be affected.",
    severity: "High",
    owner: "Alice",
    status: "Open",
    comments: [
      {
        id: "1",
        user: "Alice",
        text: "Noticed the API is down again. We need to prioritize this fix.",
        date: "2025-09-05 14:30",
      },
      {
        id: "2",
        user: "Bob",
        text: "I'm looking into the third-party API issue. Will update soon.",
        date: "2025-09-05 15:15",
      },
      {
        id: "3",
        user: "Charlie",
        text: "Can we get a timeline for the resolution? This is impacting the release.",
        date: "2025-09-05 16:00",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
    ],
  },
  {
    id: 2,
    title: "Timeline overrun",
    description: "Potential delay due to resource shortage.",
    severity: "Medium",
    owner: "Bob",
    status: "Mitigating",
    comments: [
      {
        id: "1",
        user: "Alice",
        text: "Noticed the API is down again. We need to prioritize this fix.",
        date: "2025-09-05 14:30",
      },
      {
        id: "2",
        user: "Bob",
        text: "I'm looking into the third-party API issue. Will update soon.",
        date: "2025-09-05 15:15",
      },
      {
        id: "3",
        user: "Charlie",
        text: "Can we get a timeline for the resolution? This is impacting the release.",
        date: "2025-09-05 16:00",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
    ],
  },
  {
    id: 3,
    title: "Timeline overrun",
    description: "Potential delay due to resource shortage.",
    severity: "Medium",
    owner: "Bob",
    status: "Mitigating",
    comments: [
      {
        id: "1",
        user: "Alice",
        text: "Noticed the API is down again. We need to prioritize this fix.",
        date: "2025-09-05 14:30",
      },
      {
        id: "2",
        user: "Bob",
        text: "I'm looking into the third-party API issue. Will update soon.",
        date: "2025-09-05 15:15",
      },
      {
        id: "3",
        user: "Charlie",
        text: "Can we get a timeline for the resolution? This is impacting the release.",
        date: "2025-09-05 16:00",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
    ],
  },
];

export const issues = [
  {
    id: 1,
    title: "UI Bug in Dashboard",
    description: "Users unable to filter by date in dashboard view.",
    severity: "Low",
    owner: "Charlie",
    status: "In Progress",
    comments: [
      {
        id: "1",
        user: "Alice",
        text: "Noticed the API is down again. We need to prioritize this fix.",
        date: "2025-09-05 14:30",
      },
      {
        id: "2",
        user: "Bob",
        text: "I'm looking into the third-party API issue. Will update soon.",
        date: "2025-09-05 15:15",
      },
      {
        id: "3",
        user: "Charlie",
        text: "Can we get a timeline for the resolution? This is impacting the release.",
        date: "2025-09-05 16:00",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
    ],
  },
  {
    id: 2,
    title: "Deployment Failure",
    description: "Last production release failed during CI/CD pipeline.",
    severity: "High",
    owner: "Diana",
    status: "Open",
    comments: [
      {
        id: "1",
        user: "Alice",
        text: "Noticed the API is down again. We need to prioritize this fix.",
        date: "2025-09-05 14:30",
      },
      {
        id: "2",
        user: "Bob",
        text: "I'm looking into the third-party API issue. Will update soon.",
        date: "2025-09-05 15:15",
      },
      {
        id: "3",
        user: "Charlie",
        text: "Can we get a timeline for the resolution? This is impacting the release.",
        date: "2025-09-05 16:00",
      },
      {
        id: "4",
        user: "Dave",
        text: "Just tested the workaround. It seems to be stable for now.",
        date: "2025-09-05 17:45",
      },
    ],
  },
];

const ProjectDashboardOverviewStats = () => {
  return (
    <div className={classes.container}>
      <div className={classes.statSection}>
        <div className={classes.summary}>
          <h4>Total Tasks</h4>

          <div className={classes.stats}>
            <div className={classes.stat}>
              <h5>32</h5>
              <p>Done</p>
            </div>

            <div className={classes.stat}>
              <h5>20</h5>
              <p>In dev</p>
            </div>

            <div className={classes.stat}>
              <h5>2</h5>
              <p>Blocked</p>
            </div>
          </div>
        </div>
        <div className={classes.summary}>
          <h4>Upcoming Deadlines</h4>
          <p>
            4 <span>tasks</span>
          </p>
          <ProgressBar progress={40} />
        </div>
      </div>
      <div className={classes.calendar}>
        <Calendar deadlines={deadlines} />
        <div></div>
      </div>
      <ProjectDashboardOverviewStatsIssues
        risks={risks}
        issues={issues}
        summary
      />
    </div>
  );
};

export default ProjectDashboardOverviewStats;
