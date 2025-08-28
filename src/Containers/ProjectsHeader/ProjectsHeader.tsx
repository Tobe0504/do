import {
  Archive,
  Bell,
  Calendar,
  ChevronLeft,
  MessageCircle,
  Search,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "./ProjectsHeader.module.css";

interface Props {
  title?: string;
  handleOpenClose: () => void;
  sideIsOpen?: boolean;
}

const ProjectsHeader: React.FC<Props> = ({
  title = "Project Title: Do Build",
  handleOpenClose,
  sideIsOpen,
}) => {
  // Router
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <ChevronLeft
        size={16}
        color="#a1a1a1"
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <div className={classes.inputSection}>
        <input
          type="search"
          placeholder="Search for anything within this project"
        />
        <Search size={16} className={classes.search} color="#a1a1a1" />
      </div>

      <Button type="tertiary" onClick={handleOpenClose}>
        <MessageCircle size={16} color={sideIsOpen ? "#e63e21" : "#a1a1a1"} />
      </Button>

      <Button type="tertiary" onClick={handleOpenClose}>
        <Calendar size={16} color="#a1a1a1" />
      </Button>

      <Button type="tertiary" onClick={handleOpenClose}>
        <Bell size={16} color="#a1a1a1" />
      </Button>

      <Button type="secondary">
        <Archive size={16} />
        <span>Archive</span>
      </Button>
    </div>
  );
};

export default ProjectsHeader;
