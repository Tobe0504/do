import Add from "../../Assets/Icons/Add";
import Button from "../../Components/Button/Button";
import classes from "./OrganizationHeader.module.css";

type OrganizationHeaderTypes = {
  title?: string;
};

const OrganizationHeader = ({
  title = "🌎 Hives",
}: OrganizationHeaderTypes) => {
  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <Button>
        <Add />
        <span>Create Hive</span>
      </Button>
    </div>
  );
};

export default OrganizationHeader;
