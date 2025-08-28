import { CloudUpload, FolderPlus, Upload } from "lucide-react";
import Button from "../../Components/Button/Button";
import ProjectDashbaordFilesAndAssetsDisplay from "../ProjectDashbaordFilesAndAssetsDisplay/ProjectDashbaordFilesAndAssetsDisplay";
import ProjectDashbaordFilesAndAssetsFilter from "../ProjectDashbaordFilesAndAssetsFilter/ProjectDashbaordFilesAndAssetsFilter";
import classes from "./ProjectDashbaordFilesAndAssets.module.css";

const ProjectDashbaordFilesAndAssets = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h4>Assets & Files</h4>
        <Button type="secondary">
          <CloudUpload size={16} />
          <span>Upload</span>
        </Button>
        <Button type="secondary">
          <FolderPlus size={16} />
          <span>Create Folder</span>
        </Button>
      </div>
      <div className={classes.innerContainer}>
        <ProjectDashbaordFilesAndAssetsFilter />
        <ProjectDashbaordFilesAndAssetsDisplay />
      </div>
    </section>
  );
};

export default ProjectDashbaordFilesAndAssets;
