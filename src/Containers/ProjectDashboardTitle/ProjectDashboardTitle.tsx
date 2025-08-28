import { Link, PencilLine, Plus } from "lucide-react";
import classes from "./ProjectDashboardTitle.module.css";
import Button from "../../Components/Button/Button";
import MembersList from "../../Components/MembersList";
import { projects } from "../../Utilities/dummyData";

const ProjectDashboardTitle = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.indicator}></div>
        <h3>Mobile App</h3>
        <Button type="tertiary">
          <PencilLine size={12} />
        </Button>
        <Button type="tertiary">
          <Link size={12} />
        </Button>
      </div>
      <div className={classes.members}>
        <Button type="tertiary">
          <Plus size={14} />
          <span>Invite squad</span>
        </Button>
        <MembersList members={projects?.[0]?.members} />
      </div>
    </div>
  );
};

export default ProjectDashboardTitle;
