import classes from "./OrganizationsListSummary.module.css";
import OrganizationStatCard from "../../Components/OrganizationStatCard/OrganizationStatCard";

const OrganizationsListSummary = () => {
  return (
    <section className={classes.container}>
      <OrganizationStatCard title="Total Hives" value={4} />
      <OrganizationStatCard title="Total Members Accross hives" value={4} />
      <OrganizationStatCard title="Total completed this week" value={4} />
    </section>
  );
};

export default OrganizationsListSummary;
