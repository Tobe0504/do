import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import OrganizationHeader from "../../Headers/OrganizationHeader/OrganizationHeader";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import OrganizationsLayout from "../../Layouts/OrganizationsLayout";
import { searchParamKeys } from "../../Utilities/constants";
import { navItemTypes } from "../../Utilities/types";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import OrganizationListsProjects from "../OrganizationListsProjects/OrganizationListsProjects";
import OrganizationListSquads from "../OrganizationListSquads/OrganizationListSquads";
import OrganizationListTable from "../OrganizationListTable/OrganizationListTable";
import OrganizationsListSummary from "../OrganizationsListSummary/OrganizationsListSummary";
import OrganizationListTasksContainer from "../OrganozationListTasksContainer/OrganizationListTasksContainer";
import OrganizationListHeader from "../OrgnozationHeader/OrganizationListHeader";
import classes from "./OrganizationLists.module.css";

const OrganizationLists = () => {
  // States
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "Projects",
      route: "projects",
      isActive: true,
      id: "projects",
    },
    {
      title: "Squads",
      route: "squads",
      isActive: false,
      id: "squads",
    },
    {
      title: "Dos",
      route: "dos",
      isActive: false,
      id: "dos",
    },
  ]);

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const section = updateSearchParams(
    searchParamKeys?.ORGANIZATIONS?.SECTION,
    undefined,
    "get"
  );

  // Effects
  useEffect(() => {
    if (!section) {
      updateSearchParams(
        searchParamKeys?.ORGANIZATIONS?.SECTION,
        navItems[0].id,
        "set"
      );
    }
  }, []);

  return (
    <OrganizationsLayout className={classes.container}>
      <OrganizationListHeader />
      <OrganizationsListSummary />
      {/* <OrganizationListTable /> */}

      <SectionsNav navItems={navItems} setNavItems={setNavItems} isRoute />
      {section === navItems[0].id && <OrganizationListsProjects />}
      {section === navItems[1].id && <OrganizationListSquads />}
      {section === navItems[2].id && <KanbanBoard />}
    </OrganizationsLayout>
  );
};

export default OrganizationLists;
