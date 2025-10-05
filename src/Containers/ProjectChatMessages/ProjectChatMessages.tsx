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
import { optionsType } from "../../Utilities/types";
import Options from "../../Components/Options/Options";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  setQuotedMessage?: Dispatch<SetStateAction<string | null>>;
}

const messages = [
  {
    id: 1,
    text: "Hey, how’s it going?",
    sender: "other",
    time: "Today at 2:10pm",
  },
  {
    id: 2,
    text: "All good! Just working on the project.",
    sender: "me",
    time: "Today at 2:11pm",
    status: "sent",
  },
  {
    id: 3,
    text: "Nice, what part are you on?",
    sender: "other",
    time: "Today at 2:12pm",
  },
  {
    id: 4,
    text: "Currently setting up the chat system.",
    sender: "me",
    time: "Today at 2:12pm",
    status: "delivered",
  },
  {
    id: 5,
    text: "Oh cool! Using sockets?",
    sender: "other",
    time: "Today at 2:13pm",
  },
  {
    id: 6,
    text: "Yeah, Socket.IO with Next.js 😅",
    sender: "me",
    time: "Today at 2:13pm",
    status: "read",
  },
  {
    id: 7,
    text: "That’s awesome. So Do is really coming alive 👀",
    sender: "other",
    time: "Today at 2:14pm",
  },
  {
    id: 8,
    text: "Have you handled typing indicators yet?",
    sender: "other",
    time: "Today at 2:15pm",
  },
  {
    id: 9,
    text: "Yep, just finished that earlier. Super smooth experience now.",
    sender: "me",
    time: "Today at 2:16pm",
    status: "read",
  },
  {
    id: 10,
    text: "🔥🔥🔥",
    sender: "other",
    time: "Today at 2:16pm",
  },
  {
    id: 11,
    text: "Haha thanks 😂",
    sender: "me",
    time: "Today at 2:17pm",
    status: "read",
  },
  {
    id: 12,
    text: "When do you think it’ll be ready?",
    sender: "other",
    time: "Today at 2:17pm",
  },
  {
    id: 13,
    text: `Probably by the end of the week.  
But I’m not 100% sure, I have an engagement over the weekend.`,
    sender: "me",
    time: "Today at 2:18pm",
    status: "read",
  },
  {
    id: 14,
    text: "That’s fast! 🚀",
    sender: "other",
    time: "Today at 2:18pm",
  },
  {
    id: 15,
    text: `Yeah, trying to stay productive 😅.  
The core features are ready — task creation, real-time updates, and chat.  
Now polishing the UX so Do feels different from Trello or Notion.`,
    sender: "me",
    time: "Today at 2:19pm",
    status: "read",
  },
  {
    id: 16,
    text: "Respect 👏. Honestly, the chat integration is such a game changer.",
    sender: "other",
    time: "Today at 2:20pm",
  },
  {
    id: 17,
    text: "Appreciate it bro!",
    sender: "me",
    time: "Today at 2:20pm",
    status: "read",
  },
  {
    id: 18,
    text: "What’s the idea behind Do again? Is it just tasks?",
    sender: "other",
    time: "Today at 2:21pm",
  },
  {
    id: 19,
    text: `Not just tasks.  
The goal is to make productivity feel less like a checklist and more like a **conversation**.  

So tasks, chats, notes, and even progress timelines live in one place.  
People shouldn’t need to jump between Slack, Trello, and Google Docs.`,
    sender: "me",
    time: "Today at 2:22pm",
    status: "read",
  },
  {
    id: 20,
    text: "Later!",
    sender: "other",
    time: "Today at 2:23pm",
    quote:
      "Not just tasks. The goal is to make productivity feel less like a checklist...",
  },
  {
    id: 21,
    text: "Exactly. That’s why Do exists 🙌",
    sender: "me",
    time: "Today at 2:24pm",
    status: "read",
    quote: "What’s the idea behind Do again? Is it just tasks?",
  },
];

const ProjectChatMessages: React.FC<Props> = ({ setQuotedMessage }) => {
  // States
  const [optionId, setOptionId] = useState<number | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Utils
  const messageOptions: optionsType[] = [
    // Core Message Actions
    {
      title: "Reply",
      icon: <Reply size={16} />,
      group: "Core Message Actions",
      action() {
        const activeMessage = messages[optionId as number];
        setQuotedMessage && setQuotedMessage(activeMessage.text);
        console.log(activeMessage, "Message");
      },
    },
    {
      title: "Edit message",
      icon: <Edit size={16} />,
      group: "Core Message Actions",
    },

    {
      title: "Copy link",
      icon: <LinkIcon size={16} />,
      group: "Core Message Actions",
    },
    {
      title: "Pin message",
      icon: <Pin size={16} />,
      group: "Core Message Actions",
    },
    {
      title: "Delete message",
      icon: <Trash size={16} />,
      group: "Core Message Actions",
    },

    // Collaboration & Workflow
    {
      title: "React with emoji",
      icon: <Smile size={16} />,
      group: "Collaboration & Workflow",
    },
    {
      title: "Assign as task",
      icon: <ClipboardCheck size={16} />,
      group: "Collaboration & Workflow",
    },
    {
      title: "Remind me",
      icon: <Bell size={16} />,
      group: "Collaboration & Workflow",
    },
    {
      title: "Add to knowledge base",
      icon: <BookOpen size={16} />,
      group: "Collaboration & Workflow",
    },
    {
      title: "Mark as important",
      icon: <Star size={16} />,
      group: "Collaboration & Workflow",
    },

    // AI-Driven Options
    {
      title: "Summarize thread (AI)",
      icon: <Wand2 size={16} />,
      group: "AI-Driven Options",
    },
    {
      title: "Translate message",
      icon: <Languages size={16} />,
      group: "AI-Driven Options",
    },
    {
      title: "Rewrite / clarify",
      icon: <Wand2 size={16} />,
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

  return (
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
                <p>{message.sender === "other" ? "Ezimorah Tobenna" : "You"}</p>
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
                  <EllipsisVertical size={12} strokeWidth={3} color="#a1a1a1" />
                </Button>

                {optionId === i && <Options options={messageOptions} />}
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
  );
};

export default ProjectChatMessages;
