import { useState } from "react";
import Add from "../../Assets/Icons/Add";
import Close from "../../Assets/Icons/Close";
import Button from "../../Components/Button/Button";
import FileUploadInput from "../../Components/FileUploadInput/FileUploadInput";
import FilterOptions from "../../Components/FilterOptions/FilterOptions";
import Input from "../../Components/Input/Input";
import { ToggleSwitch } from "../../Components/ToggleSwitch";
import { images } from "../../Utilities/constants";
import classes from "./CreateProjectModalBody.module.css";
import task from "../../Assets/editTask.jpg";
import viewTask from "../../Assets/viewTask.jpg";
import ProjectEditor from "../../Components/Editor/Editor";

type CreateProjectModalBodyTypes = {
  isEdit?: boolean;
  onClose: () => void;
};

const CreateProjectModalBody = ({
  isEdit,
  onClose,
}: CreateProjectModalBodyTypes) => {
  // States
  const [files, setFiles] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className={classes.outerContainer}>
      {/* <div className={`${classes.container} no-scroll-bar`}>
        <h2>{isEdit ? "Edit Task Name" : "Create a New Project"}</h2>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="E.g. Revamp landing page" label="Project Name" />

          <Input
            placeholder="Briefly describe the project scope..."
            label="Description"
          />

          <Input type="date" label="Start Date" />

          <Input type="date" label="End Date" />

          <FilterOptions
            label="Assign Squad"
            options={[
              {
                text: "Design",
                image: images?.USER_AVATAR,
              },
              {
                text: "Engineering",
                image: images?.USER_AVATAR,
              },
              {
                text: "Marketing",
                image: images?.USER_AVATAR,
              },
            ]}
            isMultiple
          />

          <FilterOptions
            label="Tags"
            options={[
              {
                text: "Design",
              },
              {
                text: "Engineering",
              },
              {
                text: "Marketing",
              },
            ]}
            isMultiple
          />

          <FilterOptions
            label="Status"
            options={[
              {
                text: "Not Started",
              },
              {
                text: "In Progress",
              },
              {
                text: "Completed",
              },
            ]}
          />

          <FileUploadInput
            files={files}
            setFiles={setFiles}
            title="Attachments / Brief Docs"
            multiple
          />

          <FileUploadInput
            files={files}
            setFiles={setFiles}
            title="Project Cover Image"
          />

          <div className="flex items-center gap-2">
            <p className="text-[#a1a1a1] font-medium text-sm">
              Visibility / Access
            </p>
            <ToggleSwitch checked={isPrivate} setChecked={setIsPrivate} />
          </div>

          <div className={classes.actions}>
            <Button
              type="null"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <Close />
              <span>Close</span>
            </Button>

            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Add />
              <span>Create Project</span>
            </Button>
          </div>
        </form>
      </div>
      <div>
        <img src={isEdit ? viewTask : task} alt="View task" />
      </div> */}

      <ProjectEditor />
    </div>
  );
};

export default CreateProjectModalBody;
