import { EllipsisVertical, Phone, Search, Video } from "lucide-react";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import classes from "./ConversationsMainHeader.module.css";
import {
  Reply,
  Edit,
  Trash,
  Link as LinkIcon,
  Pin,
  Star,
  Bell,
  BookOpen,
  ClipboardCheck,
  Calendar,
  Share2,
  Github,
  Globe,
  Languages,
  Wand2,
  ListChecks,
  Smile,
  Shield,
  Flag,
  History,
} from "lucide-react";
import { optionsType } from "../../Utilities/types";
import Options from "../../Components/Options/Options";

const ConversationsMainHeader = () => {
  // States
  const [open, setOpen] = useState({ search: false, options: false });

  // Utils
  const messageOptions: optionsType[] = [
    {
      title: "Share Access",
      icon: <LinkIcon size={16} />,
      group: "Core Message Actions",
    },

    {
      title: "Delete project",
      icon: <Trash size={16} />,
      group: "Core Message Actions",
    },

    {
      title: "Add conversation to knowledge base",
      icon: <BookOpen size={16} />,
      group: "Collaboration & Workflow",
    },

    // AI-Driven Options
    {
      title: "Summarize conversation",
      icon: <Wand2 size={16} />,
      group: "AI-Driven Options",
    },
    {
      title: "Translate conversation",
      icon: <Languages size={16} />,
      group: "AI-Driven Options",
    },

    {
      title: "Extract action items",
      icon: <ListChecks size={16} />,
      group: "AI-Driven Options",
    },
    {
      title: "Sentiment check",
      icon: <Globe size={16} />,
      group: "AI-Driven Options",
    },

    // Admin / Moderation
    { title: "Mute Conversation", icon: <Shield size={16} />, group: "Admin" },
    { title: "Report Conversation", icon: <Flag size={16} />, group: "Admin" },
    { title: "View edit history", icon: <History size={16} />, group: "Admin" },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <h5>Conversation Name</h5>
        <p>12 members</p>
      </div>

      <Button type="tertiary">
        <Phone size={16} color="#a1a1a1" strokeWidth={2} />
      </Button>

      <Button type="tertiary">
        <Video size={16} color="#a1a1a1" strokeWidth={2} />
      </Button>

      <Button
        type={open.search ? "secondary" : "tertiary"}
        onClick={() =>
          setOpen((prevState) => ({ ...prevState, search: !prevState.search }))
        }
      >
        <Search size={16} color="#a1a1a1" strokeWidth={2} />
      </Button>

      <Button
        type="tertiary"
        onClick={() =>
          setOpen((prevState) => ({
            ...prevState,
            options: !prevState.options,
          }))
        }
      >
        <EllipsisVertical size={16} color="#a1a1a1" strokeWidth={2} />
      </Button>

      {open.options && (
        <div className={classes.options}>
          <Options options={messageOptions} />
        </div>
      )}

      <div
        className={classes.search}
        style={
          !open.search
            ? { transform: "translatey(-50px)", zIndex: "-1" }
            : { transform: "translatey(0px)", zIndex: "1" }
        }
      >
        <input type="search" placeholder="Search" className={classes.search} />
      </div>
    </div>
  );
};

export default ConversationsMainHeader;
