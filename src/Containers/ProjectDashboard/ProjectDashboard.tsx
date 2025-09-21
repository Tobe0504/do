import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import { AppContext } from "../../Context/AppContext";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys } from "../../Utilities/constants";
import { navItemTypes } from "../../Utilities/types";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import ProjectChat from "../ProjectChat/ProjectChat";
import ProjectDashbaordFilesAndAssets from "../ProjectDashbaordFilesAndAssets/ProjectDashbaordFilesAndAssets";
import ProjectDashboardFilters from "../ProjectDashboardFilters/ProjectDashboardFilters";
import ProjectDashboardOverview from "../ProjectDashboardOverview/ProjectDashboardOverview";
import ProjectDashboardSecrets from "../ProjectDashboardSecrets/ProjectDashboardSecrets";
import ProjectDashboardTitle from "../ProjectDashboardTitle/ProjectDashboardTitle";
import ProjectDashboardWorkflows from "../ProjectDashboardWorkflows/ProjectDashboardWorkflows";
import ProjectsDashboardRisksAndIssues from "../ProjectsDashboardRisksAndIssues/ProjectsDashboardRisksAndIssues";
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
      title: "Workflows",
      route: "workflows",
      isActive: false,
      id: "workflows",
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
  ]);

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const section = updateSearchParams(
    searchParamKeys?.PROJECT?.KEY,
    undefined,
    "get"
  );

  // refs
  const navRef = useRef<HTMLDivElement | null>(null);

  // handlers
  const handleToggleSide = () => {
    setOpenSide((prevState) => !prevState);
  };

  const scrollToTop = () => {
    const layout = document.querySelector(`.${classes.container}`);
    layout?.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };

  // Effects
  useEffect(() => {
    if (navItems?.length > 0 && !section) {
      updateSearchParams("section", navItems?.[0]?.id, "set");
    }
  }, []);

  useEffect(() => {
    if (section && section !== navItems[0].id) {
      const timeout = setTimeout(() => {
        scrollToTop();
        console.log("Hmm");
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [section]);

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

      <div ref={navRef}>
        <SectionsNav navItems={navItems} setNavItems={setNavItems} isRoute />
      </div>
      {section === navItems[0].id && <ProjectDashboardOverview />}
      {section === navItems[1].id && <ProjectDashboardWorkflows />}
      {section === navItems[2].id && <KanbanBoard />}
      {section === navItems[3].id && <ProjectDashbaordFilesAndAssets />}
      {section === navItems[4].id && <ProjectsDashboardRisksAndIssues />}
      {section === navItems[5].id && <ProjectDashboardSecrets />}
    </DashboardLayout>
  );
};

export default ProjectDashboard;
