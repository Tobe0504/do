import ProjectChatHeader from "../ProjectChatHeader/ProjectChatHeader";
import ProjectChatMessages from "../ProjectChatMessages/ProjectChatMessages";
import ProjectChatTextSection from "../ProjectChatTextSection/ProjectChatTextSection";
import classes from "./ProjectChat.module.css";

interface Props {
  onClose: () => void;
}

const ProjectChat: React.FC<Props> = ({ onClose }) => {
  return (
    <section className={classes.container}>
      <ProjectChatHeader onClose={onClose} />
      <ProjectChatMessages />
      <ProjectChatTextSection />
    </section>
  );
};

export default ProjectChat;
