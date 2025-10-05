import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import ConversationsChannels from "../../Containers/ConversationsChannels/ConversationsChannels";
import ConversationsHeader from "../../Containers/ConversationsHeader/ConversationsHeader";
import ConversationsMain from "../../Containers/ConversationsMain/ConversationsMain";
import classes from "./ConversationsLayout.module.css";

interface Props {
  children: React.ReactNode;
}

const ConversationsLayout: React.FC<Props> = ({ children }) => {
  return (
    <DashboardLayout
      className={classes.container}
      header={<ConversationsHeader />}
    >
      <ConversationsChannels />
      {children}
    </DashboardLayout>
  );
};

export default ConversationsLayout;
