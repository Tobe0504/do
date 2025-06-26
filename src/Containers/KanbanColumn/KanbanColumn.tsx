import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { TaskType } from "../../Utilities/types";
import classes from "./KanbanColumn.module.css";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  [key: string]: any;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={classes.container}>
      <h3>{title}</h3>
      {tasks.map((task: TaskType) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default KanbanColumn;
