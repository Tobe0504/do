import React from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import OrganizationsLayout from "../../Layouts/OrganizationsLayout";
import OrganizationListTable from "../OrganizationListTable/OrganizationListTable";
import OrganizationsListSummary from "../OrganizationsListSummary/OrganizationsListSummary";
import classes from "./OrganizationLists.module.css";

const OrganizationLists = () => {
  return (
    <OrganizationsLayout className={classes.container}>
      <OrganizationsListSummary />
      <OrganizationListTable />
    </OrganizationsLayout>
  );
};

export default OrganizationLists;
