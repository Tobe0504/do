import { AtSign, ChevronDown, Hash, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { projects } from "../../Utilities/dummyData";
import { routes } from "../../Utilities/routes";
import classes from "./ConversationsChannels.module.css";

const ConversationsChannels = () => {
  // States
  const [open, setOpen] = useState({
    channels: true,
    dms: true,
    search: false,
  });

  const channels = [
    {
      name: " Mentions",
      type: "channel",
      route: routes.MENTIONS,
    },
    {
      name: "General",
      type: "chat",
      route: routes.GENERAL_CONVERSATIONS,
    },
    {
      name: "Task-123-UX Redesign",
      type: "chat",
      route: routes.CHAT_CONVERSATION,
    },

    {
      name: "Task-456-API Integration",
      type: "chat",
    },
  ];

  const dms = [
    ...projects[0].members?.map((data) => {
      return {
        name: "Ezimorah Tobenna",
        image: data,
        route: routes.CHAT_CONVERSATION,
      };
    }),
  ];

  // Router
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h2>Conversations</h2>

        <Button
          type={open?.search ? "primary" : "tertiary"}
          onClick={() => {
            setOpen((prevState) => {
              return { ...prevState, search: !prevState.search };
            });
          }}
        >
          <Search size={16} />
        </Button>

        <div style={open.search ? { maxHeight: "50px" } : { maxHeight: "0px" }}>
          <input type="search" placeholder="Search" />
        </div>
      </div>

      <div className={classes.section}>
        <div
          className={classes.sectionHeader}
          onClick={() => {
            setOpen((prevState) => {
              return { ...prevState, channels: !prevState.channels };
            });
          }}
        >
          <h4>Channels</h4>
          <ChevronDown
            size={14}
            color="#a1a1a1"
            style={
              open.channels
                ? { transform: "rotate(-90deg)" }
                : { maxHeight: "rotate(0deg)" }
            }
          />
        </div>

        <div
          style={open.channels ? { maxHeight: "2000px" } : { maxHeight: "0px" }}
          className={classes.channels}
        >
          {channels?.map((data) => {
            return (
              <div
                className={`${classes.contact} ${
                  location.pathname.includes(data?.route as string)
                    ? classes.active
                    : classes.inActive
                }`}
                key={data?.name}
                onClick={() => navigate(data?.route as string)}
              >
                <span>
                  {data?.type === "channel" ? (
                    <AtSign size={16} color="#a1a1a1" />
                  ) : (
                    <Hash size={16} color="#a1a1a1" />
                  )}
                </span>
                <span>{data?.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.section}>
        <div
          className={classes.sectionHeader}
          onClick={() => {
            setOpen((prevState) => {
              return { ...prevState, dms: !prevState.dms };
            });
          }}
        >
          <h4>Direct Messages</h4>
          <ChevronDown
            size={14}
            color="#a1a1a1"
            style={
              open.dms
                ? { transform: "rotate(-90deg)" }
                : { maxHeight: "rotate(0deg)" }
            }
          />
        </div>

        <div
          style={open.dms ? { maxHeight: "2000px" } : { maxHeight: "0px" }}
          className={classes.channels}
        >
          {dms?.map((data, i) => {
            return (
              <div className={classes.contact} key={i}>
                <span>
                  <img src={data?.image} alt={data?.name} />
                </span>
                <span>{data?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConversationsChannels;
