import GradientCard from "../GradientCard/GradientCard";
import classes from "./OrganizationStatCard.module.css";

type OrganizationStatCardTypes = {
  title: string;
  value: string | number;
};

const OrganizationStatCard = ({ title, value }: OrganizationStatCardTypes) => {
  return (
    <div className={classes.container}>
      <h4>{value}</h4>
      <p>{title}</p>
    </div>
  );
};

export default OrganizationStatCard;
