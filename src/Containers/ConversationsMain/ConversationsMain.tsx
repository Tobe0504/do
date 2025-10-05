import ConversationsMainConversations from "../ConversationsMainConversations/ConversationsMainConversations";
import ConversationsMainHeader from "../ConversationsMainHeader/ConversationsMainHeader";
import classes from "./ConversationsMain.module.css";

const ConversationsMain = () => {
  return (
    <section className={classes.container}>
      <ConversationsMainHeader />
      <ConversationsMainConversations />
    </section>
  );
};

export default ConversationsMain;
