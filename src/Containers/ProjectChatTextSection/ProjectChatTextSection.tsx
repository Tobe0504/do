import { TextareaAutosize } from "@mui/material";
import { Send } from "lucide-react";
import React from "react";
import Button from "../../Components/Button/Button";
import Textarea from "../../Components/Textarea/Textarea";
import classes from "./ProjectChatTextSection.module.css";

const ProjectChatTextSection = () => {
  return (
    <form className={classes.container}>
      <Textarea placeholder="Say something..." />
      <Button>
        <Send size={16} />
      </Button>
    </form>
  );
};

export default ProjectChatTextSection;
