import React from "react";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import OrganizationSideNav from "../Containers/OrganizationSideNav/OrganizationSideNav";
import OrganizationHeader from "../Headers/OrganizationHeader/OrganizationHeader";

type OrganizationsLayoutTypes = {
  children: React.ReactNode;
  className?: string;
};

const OrganizationsLayout = ({
  children,
  className,
}: OrganizationsLayoutTypes) => {
  return (
    <DashboardLayout header={<OrganizationHeader />}>
      {/* <OrganizationSideNav /> */}
      <section className={className}>{children}</section>
    </DashboardLayout>
  );
};

export default OrganizationsLayout;
