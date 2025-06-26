import classes from "./OrganizationsListSummary.module.css";
import OrganizationStatCard from "../../Components/OrganizationStatCard/OrganizationStatCard";
import HomeIcon from "../../SvgIcons/HomeIcon";
import Projects from "../../SvgIcons/Projects";
import Tasks from "../../SvgIcons/Tasks";
import Squads from "../../SvgIcons/Squads";
import Members from "../../SvgIcons/Members";

const OrganizationsListSummary = () => {
  return (
    <section className={classes.container}>
      <OrganizationStatCard
        label="Active Projects"
        value={4}
        icon={<Projects />}
        trend="up"
        trendValue="10"
      />
      <OrganizationStatCard
        label="Squads"
        value={4}
        icon={<Squads />}
        trend="down"
        trendValue="10"
      />
      <OrganizationStatCard
        label="Upcoming Tasks"
        value={4}
        icon={<Tasks />}
        trend="up"
        trendValue="10"
      />

      <OrganizationStatCard
        label="Members accross squads"
        value={40}
        icon={<Members />}
        trend="up"
        trendValue="10"
      />
    </section>
  );
};

export default OrganizationsListSummary;
