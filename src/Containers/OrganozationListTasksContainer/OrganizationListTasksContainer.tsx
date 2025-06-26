import React from "react";
import TaskCard from "../../Components/TaskCard/TaskCard";
import styles from "./OrganizationListTasksContainer.module.css";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskType } from "../../Utilities/types";
import { images } from "../../Utilities/constants";

export const initialTasks: TaskType[] = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create wireframes and mockups for the new landing page.",
    image:
      "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1695719310/cld-sample.jpg",
    startDate: "2025-06-01",
    endDate: "2025-06-07",
    project: "Website Redesign",
    squad: "Frontend Team",
    status: "todo",
    assignee: images.USER_AVATAR,
  },
  {
    id: "2",
    title: "Test",
    description: "Set up JWT-based authentication endpoints.",
    image: undefined,
    startDate: "2025-06-05",
    endDate: "2025-06-12",
    project: "Backend Overhaul",
    squad: "Backend Team",
    status: "inprogress",
    assignee: images.USER_AVATAR,
  },
  {
    id: "3",
    title: "Write Unit Tests",
    description: "Add unit tests for the payment processing module.",
    image:
      "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1695719311/cld-sample-4.jpg",
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    project: "E-commerce Platform",
    squad: "QA Team",
    status: "done",
    assignee: images.USER_AVATAR,
  },
  {
    id: "4",
    title: "Optimize Database Queries",
    description: "Refactor SQL queries for better performance.",
    image: undefined,
    startDate: "2025-06-08",
    endDate: "2025-06-14",
    project: "Backend Overhaul",
    squad: "Backend Team",
    status: "inprogress",
    assignee: images.USER_AVATAR,
  },
  {
    id: "5",
    title: "Conduct User Testing",
    description: "Organize user testing sessions for the mobile app.",
    image:
      "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1695719309/samples/dessert-on-a-plate.jpg",
    startDate: "2025-06-15",
    endDate: "2025-06-20",
    project: "Mobile App Launch",
    squad: "UX Team",
    status: "todo",
    assignee: images.USER_AVATAR,
  },
];

function SortableTask({ task }: { task: (typeof initialTasks)[number] }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard {...task} />
    </div>
  );
}

const OrganizationListTasksContainer = () => {
  const [tasks, setTasks] = React.useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over?.id);
      setTasks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((t) => t.title)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.taskBoard}>
          {tasks.map((task, i) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default OrganizationListTasksContainer;
