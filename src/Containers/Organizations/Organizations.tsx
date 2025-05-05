import { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import Modal from "../../Components/Modal/Modal";
import OrganizationHeader from "../../Headers/OrganizationHeader/OrganizationHeader";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys } from "../../Utilities/constants";
import CreateOrganization from "../CreateOrganization/CreateOrganization";
import NoOrganization from "../NoOrganization/NoOrganization";
import OrganizationLists from "../OrganizationLists/OrganizationLists";
import OrganizationOverview from "../OrganizationOverview/OrganizationOverview";
import classes from "./Organizations.module.css";

const Organizations = () => {
  // States

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  // Router
  const modal = updateSearchParams(
    searchParamKeys.ORGANIZATIONS.KEY,
    undefined,
    "get"
  );

  const noOrganization = (
    <DashboardLayout
      header={<OrganizationHeader title="🌎 Hives" />}
      className={classes.container}
    >
      <NoOrganization />
    </DashboardLayout>
  );

  const organization = <OrganizationLists />;

  return (
    <>
      {modal === searchParamKeys?.ORGANIZATIONS?.CREATE && (
        <Modal
          onClose={() => {
            updateSearchParams(
              searchParamKeys.ORGANIZATIONS.KEY,
              undefined,
              "delete"
            );
          }}
          body={<CreateOrganization />}
        />
      )}

      {organization}
    </>
  );
};

export default Organizations;
