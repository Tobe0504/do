import React from "react";
import { useDraggable } from "@dnd-kit/core";
import styles from "./TaskCard.module.css";
import { TaskType } from "../../Utilities/types";

const TaskCard: React.FC<TaskType> = ({
  id,
  title,
  description,
  image,
  startDate,
  endDate,
  project,
  squad,
  status,
  assignee,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: "grab",
        zIndex: 1000,
      }
    : { cursor: "grab" };

  return (
    <div
      ref={setNodeRef}
      className={styles.card}
      style={style}
      {...listeners}
      {...attributes}
    >
      {image && <img src={image} alt="Task preview" className={styles.image} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <span className={styles.tag}>
            <strong>Project:</strong> {project}
          </span>
          <span className={styles.tag}>
            <strong>Squad:</strong> {squad}
          </span>
          <span className={styles.tag}>
            <strong>Status:</strong> {status}
          </span>
        </div>

        <div className={styles.dates}>
          <span>
            <strong>Start:</strong> {startDate}
          </span>
          <span>
            <strong>End:</strong> {endDate}
          </span>
        </div>

        <div className={styles.footer}>
          <img src={assignee} alt="Assignee" className={styles.avatar} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
