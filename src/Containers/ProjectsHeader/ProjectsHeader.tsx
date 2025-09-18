import {
  Archive,
  Bell,
  Calendar,
  ChevronLeft,
  MessageCircle,
  Search,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import { genericModalsTypes } from "../../Utilities/types";
import ProjectDashboardCalendar from "../ProjectDashboardCalendar/ProjectDashboardCalendar";
import ProjectNotifications from "../ProjectNotifications/ProjectNotifications";
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

  // States
  const [modals, setModals] = useState<genericModalsTypes>({
    calendar: false,
    notifications: false,
  });

  // Refs
  const notificationnRef = useRef<HTMLDivElement | null>(null);

  // Effects
  useEffect(() => {
    const handleClearNotifications = (e: any) => {
      if (
        notificationnRef?.current &&
        !notificationnRef?.current?.contains(e.target)
      ) {
        setAllModalsFalse(setModals);
      }
    };
    document.addEventListener("mousedown", handleClearNotifications);

    return () => {
      document.removeEventListener("mousedown", handleClearNotifications);
    };
  }, []);

  return (
    <>
      {modals.calendar && (
        <Modal
          body={<ProjectDashboardCalendar />}
          onClose={() => setAllModalsFalse(setModals)}
        />
      )}

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

        <Button
          type="tertiary"
          onClick={() => setModalTrue(setModals, "calendar")}
        >
          <Calendar size={16} color="#a1a1a1" />
        </Button>

        <Button
          type="tertiary"
          onClick={() => {
            setModalTrue(setModals, "notifications");
          }}
          className={classes.notifications}
        >
          <Bell size={16} color="#a1a1a1" />

          {modals?.notifications && (
            <div
              className={classes.notificationsContainer}
              ref={notificationnRef}
            >
              <ProjectNotifications />
            </div>
          )}
        </Button>

        <Button type="secondary">
          <Archive size={16} />
          <span>Archive</span>
        </Button>
      </div>
    </>
  );
};

export default ProjectsHeader;
