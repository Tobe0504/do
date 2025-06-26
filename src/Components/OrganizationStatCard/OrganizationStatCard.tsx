import GradientCard from "../GradientCard/GradientCard";
import classes from "./OrganizationStatCard.module.css";

type OrganizationStatCardTypes = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
};

const OrganizationStatCard: React.FC<OrganizationStatCardTypes> = ({
  label,
  value,
  icon,
  trend,
  trendValue,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <span className={classes.icon}>{icon}</span>
        <span className={classes.value}>{value}</span>
      </div>
      <div className={classes.footer}>
        <span className={classes.label}>{label}</span>
        {trend && trendValue && (
          <span className={`${classes.trend} ${classes[trend]}`}>
            {trend === "up" ? "▲" : "▼"} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default OrganizationStatCard;
