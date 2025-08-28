import classes from "./OrganizationsListSummary.module.css";
import OrganizationStatCard from "../../Components/OrganizationStatCard/OrganizationStatCard";
import { Flame, FolderKanban, ListTodo, Shapes } from "lucide-react";

const OrganizationsListSummary = () => {
  return (
    <section className={classes.container}>
      <OrganizationStatCard
        label="Active Projects"
        value={4}
        icon={<FolderKanban size={16} />}
        trend="up"
        trendValue="10"
      />
      <OrganizationStatCard
        label="Squads"
        value={4}
        icon={<Shapes size={16} />}
        trend="down"
        trendValue="10"
      />
      <OrganizationStatCard
        label="Upcoming Tasks"
        value={4}
        icon={<ListTodo size={16} />}
        trend="up"
        trendValue="10"
      />

      <OrganizationStatCard
        label="Members accross squads"
        value={40}
        icon={<Flame size={16} />}
        trend="up"
        trendValue="10"
      />
    </section>
  );
};

export default OrganizationsListSummary;
