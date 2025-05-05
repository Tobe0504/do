import { Link } from "react-router-dom";
import { routeComponents } from "../../Utilities/routes";
import classes from "./OrganizationSideNav.module.css";

const OrganizationSideNav = () => {
  const organizationRoutes = routeComponents.filter((data) =>
    data?.properties?.includes("isOrganization")
  );

  return (
    <nav className={classes.container}>
      {organizationRoutes?.map((data) => {
        return <Link to={data?.route}>{data?.icon}</Link>;
      })}
    </nav>
  );
};

export default OrganizationSideNav;
