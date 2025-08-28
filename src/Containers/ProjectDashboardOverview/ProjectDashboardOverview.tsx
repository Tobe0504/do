import ProjectDashboardOverviewAssets from "../ProjectDashboardOverviewAssets/ProjectDashboardOverviewAssets";
import ProjectDashboardOverviewCharts from "../ProjectDashboardOverviewCharts/ProjectDashboardOverviewCharts";
import ProjectDashboardOverviewStats from "../ProjectDashboardOverviewStats/ProjectDashboardOverviewStats";
import classes from "./ProjectDashboardOverview.module.css";

const ProjectDashboardOverview = () => {
  return (
    <div className={classes.container}>
      <ProjectDashboardOverviewStats />
      <ProjectDashboardOverviewAssets />
      <ProjectDashboardOverviewCharts />
    </div>
  );
};

export default ProjectDashboardOverview;
