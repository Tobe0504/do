import { useState } from "react";
import ProjectChatHeader from "../ProjectChatHeader/ProjectChatHeader";
import ProjectChatMessages from "../ProjectChatMessages/ProjectChatMessages";
import ProjectChatTextSection from "../ProjectChatTextSection/ProjectChatTextSection";
import classes from "./ProjectChat.module.css";

interface Props {
  onClose: () => void;
}

const ProjectChat: React.FC<Props> = ({ onClose }) => {
  // States
  const [message, setMessage] = useState("");

  return (
    <section className={classes.container}>
      <ProjectChatHeader onClose={onClose} />
      <ProjectChatMessages setMessage={setMessage} />
      <ProjectChatTextSection message={message} setMessage={setMessage} />
    </section>
  );
};

export default ProjectChat;
