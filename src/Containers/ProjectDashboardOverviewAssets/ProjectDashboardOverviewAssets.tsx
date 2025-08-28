import { Camera, Images } from "lucide-react";
import Activity from "../../Components/Activity/Activity";
import File from "../../Components/File/File";
import MembersList from "../../Components/MembersList";
import { projects } from "../../Utilities/dummyData";
import classes from "./ProjectDashboardOverviewAssets.module.css";

const ProjectDashboardOverviewAssets = () => {
  return (
    <div className={classes.container}>
      <div className={classes.activeMembers}>
        <h4>Active Members</h4>
        <div>
          <MembersList members={projects[0].members} />
          <h5>5</h5>
        </div>
      </div>

      <div className={classes.activities}>
        <h4>Activity Feed</h4>
        <Activity />
        <Activity />
        <Activity />
      </div>

      <div className={classes.files}>
        <h4>Files</h4>

        <File type="file" name="User Research" />
        <File type="image" name="Design Mockup" />
        <File type="video" name="Style Guide" />
        <File type="audio" name="User Guide" />
      </div>
    </div>
  );
};

export default ProjectDashboardOverviewAssets;
