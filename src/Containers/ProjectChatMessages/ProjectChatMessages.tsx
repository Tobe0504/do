import { CheckCheck, EllipsisVertical } from "lucide-react";
import Button from "../../Components/Button/Button";
import { projects } from "../../Utilities/dummyData";
import classes from "./ProjectChatMessages.module.css";
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
import { genericModalsTypes, optionsType } from "../../Utilities/types";
import Options from "../../Components/Options/Options";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { messages } from "../../Utilities/dummyData";
import { useClipboard } from "../../Hooks/useClipboard";
import { useToast } from "../../Context/ToastContext";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import Modal from "../../Components/Modal/Modal";
import CreateReminderModalBody from "../CreateReminderModalBody/CreateReminderModalBody";

interface Props {
  setQuotedMessage?: Dispatch<SetStateAction<string | null>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ProjectChatMessages: React.FC<Props> = ({
  setQuotedMessage,
  setMessage,
}) => {
  // States
  const [optionId, setOptionId] = useState<number | null>(null);
  const [modals, setModals] = useState<genericModalsTypes>({ reminder: false });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<null | HTMLDivElement>(null);

  // Hooks
  const { copy } = useClipboard();
  const { showToast } = useToast();

  // Utils
  const messageOptions: optionsType[] = [
    {
      title: "Reply",
      icon: <Reply size={16} />,
      group: "Core Message Actions",
      action() {
        const activeMessage = messages[optionId as number];
        setQuotedMessage && setQuotedMessage(activeMessage.text);
        setOptionId(null);
      },
    },
    {
      title: "Edit message",
      icon: <Edit size={16} />,
      group: "Core Message Actions",
      action() {
        const activeMessage = messages[optionId as number];
        setMessage && setMessage(activeMessage?.text);
        setOptionId(null);
      },
    },

    {
      title: "Copy link",
      icon: <LinkIcon size={16} />,
      group: "Core Message Actions",
      action() {
        const activeMessage = messages[optionId as number];
        copy(activeMessage?.text);
        setOptionId(null);
      },
    },
    {
      title: "Pin message",
      icon: <Pin size={16} />,
      group: "Core Message Actions",
      action() {
        showToast("Message added to pinned messages");
        setOptionId(null);
      },
    },
    {
      title: "Delete message",
      icon: <Trash size={16} />,
      group: "Core Message Actions",
    },

    // Collaboration & Workflow

    {
      title: "Assign as task",
      icon: <ClipboardCheck size={16} />,
      group: "Collaboration & Workflow",
    },
    {
      title: "Remind me",
      icon: <Bell size={16} />,
      group: "Collaboration & Workflow",
      action() {
        setModalTrue(setModals, "reminder");
        setOptionId(null);
      },
    },
    {
      title: "Add to knowledge base",
      icon: <BookOpen size={16} />,
      group: "Collaboration & Workflow",
      action() {
        showToast("Added to knowledge base successfully!");
        setOptionId(null);
      },
    },

    {
      title: "Translate message",
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
    }, // can swap for custom

    // Integrations
    {
      title: "Export to GitHub",
      icon: <Github size={16} />,
      group: "Integrations",
    },
    {
      title: "Export to Calendar",
      icon: <Calendar size={16} />,
      group: "Integrations",
    },
    {
      title: "Share to email",
      icon: <Share2 size={16} />,
      group: "Integrations",
    },

    // Admin / Moderation
    { title: "Mute user", icon: <Shield size={16} />, group: "Admin" },
    { title: "Report message", icon: <Flag size={16} />, group: "Admin" },
    { title: "View edit history", icon: <History size={16} />, group: "Admin" },
  ];

  const scrollToBottom = (ref: RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Effects
  useEffect(() => {
    scrollToBottom(containerRef);
  }, []);

  useEffect(() => {
    const clearOptions = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current?.contains(e.target as Node)
      ) {
        setOptionId(null);
      }
    };

    document.addEventListener("mousedown", clearOptions);

    return () => {
      document.removeEventListener("mousedown", clearOptions);
    };
  }, []);

  return (
    <>
      {modals.reminder && (
        <Modal
          onClose={() => setAllModalsFalse(setModals)}
          body={<CreateReminderModalBody />}
        />
      )}
      <div className={`${classes.container} no-scroll-bar`} ref={containerRef}>
        {messages?.map((message, i) => {
          return (
            <div
              className={`${classes.message} ${
                message?.sender === "other" ? classes.received : classes.sent
              }`}
              key={message?.id}
            >
              <div className={classes.messagesInner}>
                <div className={classes.user}>
                  <img src={projects[0].members[0]} alt="Ezimorah Tobenna" />
                  <p>
                    {message.sender === "other" ? "Ezimorah Tobenna" : "You"}
                  </p>
                  <Button
                    type="tertiary"
                    onClick={() => {
                      setOptionId((prevState) => {
                        if (prevState === i) {
                          return null;
                        } else {
                          return i;
                        }
                      });
                    }}
                  >
                    <EllipsisVertical
                      size={12}
                      strokeWidth={3}
                      color="#a1a1a1"
                    />
                  </Button>

                  {optionId === i && (
                    <Options options={messageOptions} ref={optionsRef} />
                  )}
                </div>

                {message.quote && (
                  <div className={classes.quote}>
                    <span>{message?.quote}</span>
                  </div>
                )}
                <div className={classes.chatBubble}>{message?.text}</div>
                <div className={classes.details}>
                  <p>{message?.time}</p>
                  {message?.status === "read" && (
                    <CheckCheck size={14} color="#e63e21" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectChatMessages;
