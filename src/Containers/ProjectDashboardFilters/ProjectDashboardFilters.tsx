import { Users } from "lucide-react";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Input from "../../Components/Input/Input";
import classes from "./ProjectDashboardFilters.module.css";

const ProjectDashboardFilters = () => {
  return (
    <div className={classes.container}>
      <Dropdown
        options={["Development", "Design"]}
        label="Filter by squad"
        isLoading
      />
      <Input label="Filter by Start Date" type="date" />
      <Button type="secondary">
        <Users size={16} />
        <span>Share</span>
      </Button>
    </div>
  );
};

export default ProjectDashboardFilters;
