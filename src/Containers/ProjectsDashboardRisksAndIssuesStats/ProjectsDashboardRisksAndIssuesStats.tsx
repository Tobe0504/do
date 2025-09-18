import classes from "../OrganizationsListSummary/OrganizationsListSummary.module.css";
import OrganizationStatCard from "../../Components/OrganizationStatCard/OrganizationStatCard";
import {
  Bug,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  Flame,
  FolderKanban,
  ListTodo,
  Shapes,
} from "lucide-react";

const ProjectsDashboardRisksAndIssuesStats = () => {
  return (
    <section className={classes.container}>
      <OrganizationStatCard
        label="Total Issues"
        value={4}
        icon={<CircleDot size={16} />}
        trend="up"
        trendValue="10"
      />
      <OrganizationStatCard
        label="Open"
        value={4}
        icon={<CircleDotDashed size={16} />}
        trend="down"
        trendValue="10"
      />
      <OrganizationStatCard
        label="High Priority"
        value={4}
        icon={<Bug size={16} />}
        trend="up"
        trendValue="10"
      />

      <OrganizationStatCard
        label="Resolved"
        value={40}
        icon={<CircleDashed size={16} />}
        trend="up"
        trendValue="10"
      />
    </section>
  );
};

export default ProjectsDashboardRisksAndIssuesStats;
