import { Columns2, ExternalLink } from "lucide-react";
import Button from "../../Components/Button/Button";
import classes from "./ProjectChatHeader.module.css";

interface Props {
  onClose: () => void;
}

const ProjectChatHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={classes.container}>
      <h3>Project Title & Activity</h3>
      <Button type="null" onClick={onClose}>
        <Columns2 size={16} />
      </Button>
      <Button type="null" disabled>
        <ExternalLink size={16} />
      </Button>
    </div>
  );
};

export default ProjectChatHeader;
