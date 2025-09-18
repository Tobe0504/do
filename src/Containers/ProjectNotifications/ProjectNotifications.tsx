"use client";

import styles from "./ProjectNotifications.module.css";
import Button from "../../Components/Button/Button";
import { FileIcon } from "lucide-react";
import { images } from "../../Utilities/constants";

interface Notification {
  id: string;
  type: "joined" | "request" | "comment" | "file" | "task";
  user: {
    name: string;
    avatar: string;
  };
  project?: string;
  message?: string;
  file?: {
    name: string;
    type: string;
  };
  time: string;
  system: string;
  unread?: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "joined",
    user: { name: "Olivia Haze", avatar: images.USER_AVATAR },
    project: "Marketing",
    time: "1 min ago",
    system: "Defcon systems",
    unread: true,
  },
  {
    id: "2",
    type: "request",
    user: { name: "Hanna Wayne", avatar: images.USER_AVATAR },
    project: "Directions",
    time: "5 min ago",
    system: "Defcon systems",
    unread: true,
  },
  {
    id: "3",
    type: "comment",
    user: { name: "Greg Rodrigues", avatar: images.USER_AVATAR },
    project: "Directions",
    message:
      "A tutorial would be cool. Unsure if people can see each others schedules without being admin?",
    time: "30 min ago",
    system: "Defcon systems",
  },
  {
    id: "4",
    type: "file",
    user: { name: "Olivia Haze", avatar: images.USER_AVATAR },
    project: "Marketing",
    file: { name: "Landing_draft.pdf", type: "PDF" },
    time: "1 hour ago",
    system: "Defcon systems",
  },
  {
    id: "5",
    type: "task",
    user: { name: "Valery Shane", avatar: images.USER_AVATAR },
    project: "BilldCorp",
    message: "marked 10 tasks complete",
    time: "1 day ago",
    system: "Defcon systems",
  },
  {
    id: "1",
    type: "joined",
    user: { name: "Olivia Haze", avatar: images.USER_AVATAR },
    project: "Marketing",
    time: "1 min ago",
    system: "Defcon systems",
    unread: true,
  },
  {
    id: "2",
    type: "request",
    user: { name: "Hanna Wayne", avatar: images.USER_AVATAR },
    project: "Directions",
    time: "5 min ago",
    system: "Defcon systems",
    unread: true,
  },
  {
    id: "3",
    type: "comment",
    user: { name: "Greg Rodrigues", avatar: images.USER_AVATAR },
    project: "Directions",
    message:
      "A tutorial would be cool. Unsure if people can see each others schedules without being admin?",
    time: "30 min ago",
    system: "Defcon systems",
  },
  {
    id: "4",
    type: "file",
    user: { name: "Olivia Haze", avatar: images.USER_AVATAR },
    project: "Marketing",
    file: { name: "Landing_draft.pdf", type: "PDF" },
    time: "1 hour ago",
    system: "Defcon systems",
  },
  {
    id: "5",
    type: "task",
    user: { name: "Valery Shane", avatar: images.USER_AVATAR },
    project: "BilldCorp",
    message: "marked 10 tasks complete",
    time: "1 day ago",
    system: "Defcon systems",
  },
];

export default function ProjectNotifications() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Notifications</h2>
        <Button type="tertiary" className={styles.markAll}>
          Mark all as read
        </Button>
        <span className={styles.unread}></span>
      </div>

      {/* List */}
      <div className={styles.list}>
        {notifications.map((n) => (
          <div key={n.id} className={styles.item}>
            {/* Avatar */}
            <img
              src={n.user.avatar}
              alt={n.user.name}
              width={40}
              height={40}
              className={styles.avatar}
            />

            {/* Content */}
            <div className={styles.content}>
              {n.type === "joined" && (
                <p>
                  <span className={styles.name}>{n.user.name}</span> joined the
                  project <span className={styles.project}>{n.project}</span>
                </p>
              )}

              {n.type === "request" && (
                <div>
                  <p>
                    <span className={styles.name}>{n.user.name}</span> wants to
                    edit project{" "}
                    <span className={styles.project}>{n.project}</span>
                  </p>
                  <div className={styles.actions}>
                    <Button>Approve</Button>
                    <Button type="secondary">Deny</Button>
                  </div>
                </div>
              )}

              {n.type === "comment" && (
                <div>
                  <p>
                    <span className={styles.name}>{n.user.name}</span> commented
                    in <span className={styles.project}>{n.project}</span>
                  </p>
                  <p className={styles.comment}>{n.message}</p>
                </div>
              )}

              {n.type === "file" && (
                <div>
                  <p>
                    <span className={styles.name}>{n.user.name}</span> shared a
                    file in <span className={styles.project}>{n.project}</span>
                  </p>
                  <div className={styles.file}>
                    <FileIcon className={styles.fileIcon} />
                    <span>{n.file?.name}</span>
                  </div>
                </div>
              )}

              {n.type === "task" && (
                <p>
                  <span className={styles.name}>{n.user.name}</span> {n.message}{" "}
                  in <span className={styles.project}>{n.project}</span>
                </p>
              )}

              <p className={styles.meta}>
                {n.time} · {n.system}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
