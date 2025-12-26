import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { initialTasks } from "../OrganozationListTasksContainer/OrganizationListTasksContainer";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import classes from "./KanbanBoard.module.css";
import { Calendar, Kanban, List, Table } from "lucide-react";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  [key: string]: any;
}

const statuses: ("todo" | "inprogress" | "done")[] = [
  "todo",
  "inprogress",
  "done",
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>(() => {
    const grouped: Record<string, Task[]> = {
      todo: [],
      inprogress: [],
      done: [],
    };
    for (const task of initialTasks) {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    }
    return grouped;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;

    const sourceGroup = Object.keys(tasks).find((group) =>
      tasks[group].some((t) => t.id === active.id)
    );
    const destinationGroup = over.id as string;

    if (
      !sourceGroup ||
      !destinationGroup ||
      sourceGroup === destinationGroup ||
      !statuses.includes(destinationGroup as any)
    ) {
      return;
    }

    const movedTask = tasks[sourceGroup].find((t) => t.id === active.id);
    if (!movedTask) return;

    setTasks((prev) => ({
      ...prev,
      [sourceGroup]: prev[sourceGroup].filter((t) => t.id !== active.id),
      [destinationGroup]: [
        ...prev[destinationGroup],
        { ...movedTask, status: destinationGroup as Task["status"] },
      ],
    }));
  };

  const [views, setViews] = useState([
    {
      title: "Kanban",
      isActive: true,
      icon: <Kanban size={16} />,
    },
    {
      title: "List",
      isActive: false,
      icon: <List size={16} />,
    },
    {
      title: "Table",
      isActive: false,
      icon: <Table size={16} />,
    },
    {
      title: "Calendar",
      isActive: false,
      icon: <Calendar size={16} />,
    },
  ]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={classes.outerContainer}>
        <div className={classes.viewNav}>
          {views.map((data, i) => {
            return (
              <div
                key={data?.title}
                className={data?.isActive ? classes.active : undefined}
                onClick={() => activeToggler(i, views, setViews)}
              >
                <span>{data?.icon}</span>
                <span>{data?.title}</span>
              </div>
            );
          })}
        </div>
        <div className={classes.container}>
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              id={status}
              title={status}
              tasks={tasks[status]}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
