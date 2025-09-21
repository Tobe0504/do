import { CloudUpload } from "lucide-react";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import FileUploadInput from "../../Components/FileUploadInput/FileUploadInput";
import Input from "../../Components/Input/Input";
import classes from "./ProjectDashboardFIleAndAssetsUpload.module.css";

const ProjectDashboardFIleAndAssetsUpload = () => {
  // States
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={classes.container}>
      <h4>Upload File</h4>

      <form action="">
        <Input label="File Name" />
        <FileUploadInput
          title="Upload File"
          files={files}
          setFiles={setFiles}
        />

        <Button>
          <CloudUpload size={16} />
          <span> Upload File</span>
        </Button>
      </form>
    </div>
  );
};

export default ProjectDashboardFIleAndAssetsUpload;
