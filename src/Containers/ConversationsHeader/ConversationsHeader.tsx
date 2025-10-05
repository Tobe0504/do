import { AtSign, Settings, UserRoundPen } from "lucide-react";
import Button from "../../Components/Button/Button";
import User from "../../Components/User/User";
import classes from "./ConversationsHeader.module.css";

const ConversationsHeader = () => {
  const options = [
    {
      title: "Profile",
      icon: <UserRoundPen strokeWidth={2} size={16} />,
      action: () => {},
    },
    {
      title: "Settings",
      icon: <Settings size={16} />,
      action: () => {},
    },
  ];

  return (
    <div className={classes.container}>
      <h1>Conversations</h1>
      <Button type="tertiary" title="Mentions">
        <AtSign size={16} strokeWidth={2} />
      </Button>
      <User options={options} />
    </div>
  );
};

export default ConversationsHeader;
