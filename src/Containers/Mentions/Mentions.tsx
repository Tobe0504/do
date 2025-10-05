import { AtSign } from "lucide-react";
import ConversationsLayout from "../../Layouts/ConversationsLayout/ConversationsLayout";
import { projects } from "../../Utilities/dummyData";
import classes from "./Mentions.module.css";

type MentionItem = {
  id: number;
  sender: string;
  senderAvatar: string;
  room: string;
  message: string;
  time: string;
  dateGroup: "Today" | "Yesterday" | "Last Week";
};

const mentions: MentionItem[] = [
  {
    id: 1,
    sender: "Ezimorah Tobenna",
    senderAvatar: projects[0].members[0],
    room: "#general",
    message: "Hey @you, can you review the new design by EOD?",
    time: "2:13 PM",
    dateGroup: "Today",
  },
  {
    id: 2,
    sender: "Jane Doe",
    senderAvatar: projects[0].members[0],
    room: "#project-do",
    message: "@you check out this task: Refactor the socket events handler",
    time: "10:48 AM",
    dateGroup: "Today",
  },
  {
    id: 3,
    sender: "Michael",
    senderAvatar: projects[0].members[0],
    room: "#product",
    message: "Reminder @you: prepare the onboarding slides",
    time: "5:40 PM",
    dateGroup: "Yesterday",
  },
  {
    id: 4,
    sender: "Sarah",
    senderAvatar: projects[0].members[0],
    room: "#do-team",
    message: "@you loved this idea. Can you help me draft it?",
    time: "Sep 25, 9:22 AM",
    dateGroup: "Last Week",
  },
];

const MentionsPage: React.FC = () => {
  const grouped = mentions.reduce<Record<string, MentionItem[]>>((acc, m) => {
    if (!acc[m.dateGroup]) acc[m.dateGroup] = [];
    acc[m.dateGroup].push(m);
    return acc;
  }, {});

  const handleClick = (mention: MentionItem) => {
    console.log("Navigate to message:", mention);
  };

  return (
    <ConversationsLayout>
      <section className={classes.container}>
        <h2>
          <AtSign size={16} color="#a1a1a1" /> Mentions
        </h2>
        {Object.keys(grouped).map((group) => (
          <div key={group} className={classes.group}>
            <p className={classes.groupTitle}>{group}</p>
            {grouped[group].map((mention) => (
              <div
                key={mention.id}
                className={classes.mentionItem}
                onClick={() => handleClick(mention)}
              >
                <img
                  src={mention.senderAvatar}
                  alt={mention.sender}
                  className={classes.avatar}
                />
                <div className={classes.details}>
                  <span className={classes.sender}>
                    {mention.sender} →{" "}
                    <span className={classes.room}>{mention.room}</span>
                  </span>
                  <p
                    className={classes.message}
                    dangerouslySetInnerHTML={{
                      __html: mention.message.replace(
                        /@you/g,
                        `<span class="${classes.highlight}">@you</span>`
                      ),
                    }}
                  />
                  <time className={classes.time}>{mention.time}</time>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </ConversationsLayout>
  );
};

export default MentionsPage;
