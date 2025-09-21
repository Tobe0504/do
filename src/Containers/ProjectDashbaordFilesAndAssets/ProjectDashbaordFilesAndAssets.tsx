import { CloudUpload, FolderPlus, Upload } from "lucide-react";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import { genericModalsTypes } from "../../Utilities/types";
import ProjectDashbaordFilesAndAssetsDisplay from "../ProjectDashbaordFilesAndAssetsDisplay/ProjectDashbaordFilesAndAssetsDisplay";
import ProjectDashbaordFilesAndAssetsFilter from "../ProjectDashbaordFilesAndAssetsFilter/ProjectDashbaordFilesAndAssetsFilter";
import ProjectDashboardFIleAndAssetsUpload from "../ProjectDashboardFIleAndAssetsUpload/ProjectDashboardFIleAndAssetsUpload";
import classes from "./ProjectDashbaordFilesAndAssets.module.css";

const ProjectDashbaordFilesAndAssets = () => {
  // STates
  const [modals, setModals] = useState<genericModalsTypes>({ upload: false });

  return (
    <>
      {modals.upload && (
        <Modal
          onClose={() => setAllModalsFalse(setModals)}
          body={<ProjectDashboardFIleAndAssetsUpload />}
        />
      )}
      <section className={classes.container}>
        <div className={classes.header}>
          <h4>Assets & Files</h4>
          <Button
            type="secondary"
            onClick={() => setModalTrue(setModals, "upload")}
          >
            <CloudUpload size={16} />
            <span>Upload</span>
          </Button>
        </div>
        <div className={classes.innerContainer}>
          <ProjectDashbaordFilesAndAssetsFilter />
          <ProjectDashbaordFilesAndAssetsDisplay />
        </div>
      </section>
    </>
  );
};

export default ProjectDashbaordFilesAndAssets;
