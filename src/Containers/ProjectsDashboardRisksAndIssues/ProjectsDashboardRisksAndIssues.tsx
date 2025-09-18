import { Plus } from "lucide-react";
import Button from "../../Components/Button/Button";
import {
  issues,
  risks,
} from "../ProjectDashboardOverviewStats/ProjectDashboardOverviewStats";
import ProjectDashboardOverviewStatsChart from "../ProjectDashboardOverviewStatsChart/ProjectDashboardOverviewStatsChart";
import ProjectDashboardOverviewStatsIssues from "../ProjectDashboardOverviewStatsIssues/ProjectDashboardOverviewStatsIssues";
import ProjectsDashboardRisksAndIssuesStats from "../ProjectsDashboardRisksAndIssuesStats/ProjectsDashboardRisksAndIssuesStats";
import classes from "./ProjectsDashboardRisksAndIssues.module.css";

const ProjectsDashboardRisksAndIssues = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h4>Risks & Issues</h4>
        <Button type="secondary">
          <Plus size={16} />
          <span>Add Issue</span>
        </Button>
      </div>

      <ProjectsDashboardRisksAndIssuesStats />
      <div className={classes.risks}>
        <ProjectDashboardOverviewStatsIssues risks={risks} issues={issues} />
        <ProjectDashboardOverviewStatsChart />
      </div>
    </section>
  );
};

export default ProjectsDashboardRisksAndIssues;
