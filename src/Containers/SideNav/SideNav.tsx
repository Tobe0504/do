import { Link, useNavigate } from "react-router-dom";
import ChevronDown from "../../SvgIcons/ChevronDown";
import {
  routeComponents,
  routes,
  sideNavFooterRoutes,
} from "../../Utilities/routes";
import Logo from "../Logo/Logo";
import classes from "./SideNav.module.css";

const SideNav = () => {
  // Router
  const navigate = useNavigate();

  return (
    <section className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Logo />
          <h1>
            <span>Do</span>
            <ChevronDown />
          </h1>
        </div>

        <nav>
          {routeComponents
            ?.filter((data) => data?.properties?.includes("isSideNavRoute"))
            ?.map((data) => {
              return (
                <Link to={data?.route}>
                  {data?.icon}
                  <span>{data?.title}</span>
                </Link>
              );
            })}
        </nav>

        <nav>
          <h3
            onClick={() => {
              navigate(routes.ORGANIZATIONS);
            }}
          >
            <span>Hives</span>
            <ChevronDown />
          </h3>
          <Link to="#0">
            <span>♛</span>
            <span>WDW</span>
          </Link>

          <Link to="#0">
            <span>🇳🇬</span>
            <span>The Wknd</span>
          </Link>
        </nav>

        <nav>
          <h3>
            <span>Personal</span>
            <ChevronDown />
          </h3>
          <Link to="#0">
            <span>🏦</span>
            <span>FCMB</span>
          </Link>

          <Link to="#0">
            <span>💻</span>
            <span>Tech</span>
          </Link>
        </nav>

        <nav>
          <h3>
            <span>Favourites</span>
            <ChevronDown />
          </h3>
          <Link to="#0">
            <span>📝</span>
            <span>Articles</span>
          </Link>

          <Link to="#0">
            <span>🎨</span>
            <span>Design</span>
          </Link>

          <Link to="#0">
            <span>💗</span>
            <span>Volunteering</span>
          </Link>
        </nav>
      </div>

      <div className={classes.altContainer}>
        {sideNavFooterRoutes
          ?.filter((data) => data?.properties?.includes("isSideNavRoute"))
          ?.map((data) => {
            return (
              <Link to={data?.route}>
                {data?.icon}
                <span>{data?.title}</span>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SideNav;
