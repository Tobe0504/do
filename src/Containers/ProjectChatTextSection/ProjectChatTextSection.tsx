import { TextareaAutosize } from "@mui/material";
import { Send } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../../Components/Button/Button";
import Textarea from "../../Components/Textarea/Textarea";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import classes from "./ProjectChatTextSection.module.css";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ProjectChatTextSection: React.FC<Props> = ({ message, setMessage }) => {
  return (
    <form className={classes.container}>
      <Textarea
        placeholder="Say something..."
        value={message}
        onChange={(e) => inputChangeHandler(e, setMessage, true)}
      />
      <Button disabled={!message}>
        <Send size={16} />
      </Button>
    </form>
  );
};

export default ProjectChatTextSection;
