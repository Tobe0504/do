import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { TaskType } from "../../Utilities/types";
import classes from "./KanbanColumn.module.css";
import { Ellipsis, Plus } from "lucide-react";

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
      <div className={classes.header}>
        <h3>{title}</h3>
        <Plus size={16} color="#a1a1a1" strokeWidth={2} />
        <Ellipsis size={16} color="#a1a1a1" strokeWidth={2} />
      </div>
      {tasks?.length > 0 ? (
        tasks.map((task: TaskType) => <TaskCard key={task.id} {...task} />)
      ) : (
        <p className={classes.noTasks}>
          🪄 Abracadabra! No tasks here (yet), <br />
          maybe they're hiding?
        </p>
      )}
    </div>
  );
};

export default KanbanColumn;
