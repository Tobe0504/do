import { CheckCheck } from "lucide-react";
import classes from "./ProjectChatMessages.module.css";

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
  { id: 7, text: "That’s awesome.", sender: "other", time: "Today at 2:14pm" },
  {
    id: 8,
    text: "Have you handled typing indicators yet?",
    sender: "other",
    time: "Today at 2:15pm",
  },
  {
    id: 9,
    text: "Yep, just finished that earlier.",
    sender: "me",
    time: "Today at 2:16pm",
    status: "read",
  },
  { id: 10, text: "🔥🔥🔥", sender: "other", time: "Today at 2:16pm" },
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
    text: "Probably by the end of the week.",
    sender: "me",
    time: "Today at 2:18pm",
    status: "read",
  },
  { id: 14, text: "That’s fast!", sender: "other", time: "Today at 2:18pm" },
  {
    id: 15,
    text: "Trying to stay productive 😅",
    sender: "me",
    time: "Today at 2:19pm",
    status: "read",
  },
  { id: 16, text: "Respect 👏", sender: "other", time: "Today at 2:20pm" },
  {
    id: 17,
    text: "Appreciate it bro!",
    sender: "me",
    time: "Today at 2:20pm",
    status: "read",
  },
  {
    id: 18,
    text: "Alright I’ll let you focus.",
    sender: "other",
    time: "Today at 2:21pm",
  },
  {
    id: 19,
    text: "Cool, talk later ✌️",
    sender: "me",
    time: "Today at 2:21pm",
    status: "read",
  },
  { id: 20, text: "Later!", sender: "other", time: "Today at 2:22pm" },
];

const ProjectChatMessages = () => {
  return (
    <div className={`${classes.container} no-scroll-bar`}>
      {messages?.map((message) => {
        return (
          <div
            className={`${classes.message} ${
              message?.sender === "other" ? classes.received : classes.sent
            }`}
            key={message?.id}
          >
            <div className={classes.chatBubble}>{message?.text}</div>
            <div className={classes.details}>
              <p>{message?.time}</p>
              {message?.status === "read" && (
                <CheckCheck size={14} color="#e63e21" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectChatMessages;
