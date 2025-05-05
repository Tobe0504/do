import Table from "../../Components/Table/Table";
import { organizations } from "../../Utilities/data";

const OrganizationListTable = () => {
  return (
    <Table
      data={organizations}
      fields={["name", "squads", "projects", "members"]}
      header="Hives"
      headers={["Name", "Squads", "Projects", "Members"]}
    />
  );
};

export default OrganizationListTable;
