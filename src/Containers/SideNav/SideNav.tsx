import { ChevronDown, FolderKanban, Heart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";
import { images } from "../../Utilities/constants";
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

  const sideNavHives = {
    title: "Hives",
    route: routes.ORGANIZATIONS,
    isActive: false,
    children: [
      {
        name: "Meta AI",
        logo: images.logo,
        route: routes.ORGANIZATIONS,
      },
      {
        name: "Google Inc.",
        logo: images.USER_AVATAR,
        route: routes.ORGANIZATIONS,
      },
    ],
  };

  const sideProjects = {
    title: "Projects",
    route: routes.PROJECT_OVERVIEW,
    isActive: false,
    children: [
      {
        name: "Design System Build",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Marketing Campaign Launch",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Mobile App Revamp",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Onboarding Flow Improvements",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Internal Wiki Setup",
        route: routes.PROJECT_OVERVIEW,
      },
    ],
  };

  const sideFavourites = {
    title: "Favourites",
    route: routes.PROJECT_OVERVIEW,
    isActive: false,
    children: [
      {
        name: "Quarterly Planning",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "New Feature Research",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Customer Feedback Loop",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Performance Optimization",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Do Website Refresh",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Design System Build",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Marketing Campaign Launch",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Mobile App Revamp",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Onboarding Flow Improvements",
        route: routes.PROJECT_OVERVIEW,
      },
      {
        name: "Internal Wiki Setup",
        route: routes.PROJECT_OVERVIEW,
      },
    ],
  };

  // States
  const [hives, setHives] = useState(sideNavHives);
  const [projects, setProject] = useState(sideProjects);
  const [favorites, setFavorites] = useState(sideFavourites);

  return (
    <section className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Logo />
          <h1>
            <span>Do</span>
            <ChevronDown size={16} />
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
              navigate(`${routes.ORGANIZATIONS}?section=projects`);
              setHives((prevState) => ({
                ...prevState,
                isActive: !prevState?.isActive,
              }));
            }}
          >
            <span>{hives.title}</span>
            <ChevronDown
              color="#a1a1a1"
              size={16}
              style={
                hives?.isActive
                  ? {
                      transform: "rotate(-90deg)",
                      transition: "all .2s ease-in-out",
                    }
                  : {
                      transform: "rotate(0deg)",
                      transition: "all .2s ease-in-out",
                    }
              }
            />
          </h3>

          <div
            className={classes.options}
            style={
              hives?.isActive ? { maxHeight: "1000px" } : { maxHeight: "0px" }
            }
          >
            {hives?.children?.map((data) => {
              return (
                <Link
                  to={data?.route}
                  key={data?.name}
                  className={classes.subItem}
                >
                  <img src={data?.logo} alt={data?.name} />
                  <span className="truncate">{data?.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <nav>
          <h3
            onClick={() => {
              navigate(`${routes.ORGANIZATIONS}?section=projects`);
              setProject((prevState) => ({
                ...prevState,
                isActive: !prevState?.isActive,
              }));
            }}
          >
            <span>{projects.title}</span>
            <ChevronDown
              color="#a1a1a1"
              size={16}
              style={
                projects?.isActive
                  ? {
                      transform: "rotate(-90deg)",
                      transition: "all .2s ease-in-out",
                    }
                  : {
                      transform: "rotate(0deg)",
                      transition: "all .2s ease-in-out",
                    }
              }
            />
          </h3>

          <div
            className={classes.options}
            style={
              projects?.isActive
                ? { maxHeight: "1000px" }
                : { maxHeight: "0px" }
            }
          >
            {projects?.children?.map((data) => {
              return (
                <Link
                  to={data?.route}
                  key={data?.name}
                  className={classes.subItem}
                >
                  <FolderKanban size={18} />
                  <span className="truncate">{data?.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <nav>
          <h3
            onClick={() => {
              navigate(`${routes.ORGANIZATIONS}?section=projects`);
              setFavorites((prevState) => ({
                ...prevState,
                isActive: !prevState?.isActive,
              }));
            }}
          >
            <span>{favorites.title}</span>
            <ChevronDown
              color="#a1a1a1"
              size={16}
              style={
                favorites?.isActive
                  ? {
                      transform: "rotate(-90deg)",
                      transition: "all .2s ease-in-out",
                    }
                  : {
                      transform: "rotate(0deg)",
                      transition: "all .2s ease-in-out",
                    }
              }
            />
          </h3>

          <div
            className={classes.options}
            style={
              favorites?.isActive
                ? { maxHeight: "1000px" }
                : { maxHeight: "0px" }
            }
          >
            {favorites?.children?.map((data) => {
              return (
                <Link
                  to={data?.route}
                  key={data?.name}
                  className={`${classes.subItem} `}
                >
                  <Heart color="#e63e21" size={18} />
                  <span className="truncate">{data?.name}</span>
                </Link>
              );
            })}
          </div>
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
