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
import { Block } from "@blocknote/core";

type CreateProjectModalBodyTypes = {
  isEdit?: boolean;
  onClose: () => void;
};

const CreateProjectModalBody = ({
  isEdit,
  onClose,
}: CreateProjectModalBodyTypes) => {
  const initial = [
    {
      type: "heading",
      content: "🚀 New Project",
    },
    {
      type: "paragraph",
      content: "📅 Start Date: ",
    },
    {
      type: "paragraph",
      content: "✅ End Date: ",
    },
    {
      type: "paragraph",
      content: "📝 Project Description...",
    },
  ];

  const [data, setData] = useState<Block[]>([]);

  return (
    <div className={classes.outerContainer}>
      <ProjectEditor state={data} setState={setData} initial={initial} />
    </div>
  );
};

export default CreateProjectModalBody;
