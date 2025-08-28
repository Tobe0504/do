import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys } from "../../Utilities/constants";
import { navItemTypes } from "../../Utilities/types";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import ProjectChat from "../ProjectChat/ProjectChat";
import ProjectDashbaordFilesAndAssets from "../ProjectDashbaordFilesAndAssets/ProjectDashbaordFilesAndAssets";
import ProjectDashboardFilters from "../ProjectDashboardFilters/ProjectDashboardFilters";
import ProjectDashboardOverview from "../ProjectDashboardOverview/ProjectDashboardOverview";
import ProjectDashboardTitle from "../ProjectDashboardTitle/ProjectDashboardTitle";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import classes from "./ProjectDashboard.module.css";

const ProjectDashboard = () => {
  // States
  const [openSide, setOpenSide] = useState(false);
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "Overview",
      route: "overview",
      isActive: true,
      id: "overview",
    },
    {
      title: "Do's",
      route: "dos",
      isActive: false,
      id: "dos",
    },
    {
      title: "Files & Assets",
      route: "files-and-assets",
      isActive: false,
      id: "files-and-assets",
    },
    {
      title: "Risks & Issues",
      route: "risks-and-issues",
      isActive: false,
      id: "risks-and-issues",
    },
    {
      title: "Secrets",
      route: "secrets",
      isActive: false,
      id: "secrets",
    },
    {
      title: "Settings",
      route: "settings",
      isActive: false,
      id: "settings",
    },
  ]);

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const section = updateSearchParams(
    searchParamKeys?.PROJECT?.KEY,
    undefined,
    "get"
  );

  // handlers
  const handleToggleSide = () => {
    setOpenSide((prevState) => !prevState);
  };

  // Effects
  useEffect(() => {
    if (navItems?.length > 0 && !section) {
      updateSearchParams("section", navItems?.[0]?.id, "set");
    }
  }, []);

  return (
    <DashboardLayout
      header={
        <ProjectsHeader
          handleOpenClose={handleToggleSide}
          sideIsOpen={openSide}
        />
      }
      openSidenav={openSide}
      rightBarChild={<ProjectChat onClose={handleToggleSide} />}
      className={classes.container}
    >
      <ProjectDashboardTitle />
      <ProjectDashboardFilters />
      <div>
        <SectionsNav navItems={navItems} setNavItems={setNavItems} isRoute />
      </div>
      {section === navItems[0].id && <ProjectDashboardOverview />}
      {section === navItems[1].id && <KanbanBoard />}
      {section === navItems[2].id && <ProjectDashbaordFilesAndAssets />}
    </DashboardLayout>
  );
};

export default ProjectDashboard;
