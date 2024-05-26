import { v4 } from "uuid";

export interface tasksType {
  id: string | number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  subTasks?: {
    title: string;
    isComplete: boolean;
  }[];
  isComplete: boolean;
  dateAdded: Date | number | string;
}

const date = new Date();

export const tasks: tasksType[] = [
  {
    id: v4(),
    title: "First task",
    description: "This is my first task",
    dateAdded: date,
    startDate: "024-05-25",
    endDate: "2024-05-25",
    isComplete: false,
    subTasks: [
      {
        title: "Check this",
        isComplete: false,
      },
    ],
  },

  {
    id: v4(),
    title: "First task",
    description: "This is my first task",
    dateAdded: "2024-05-25",
    startDate: "024-05-25",
    endDate: "2024-05-28",
    isComplete: false,
    subTasks: [
      {
        title: "Check this",
        isComplete: false,
      },
    ],
  },

  {
    id: v4(),
    title: "First task",
    description: "This is my first task",
    dateAdded: "2024-05-25",
    startDate: "024-05-25",
    endDate: "2024-05-28",
    isComplete: false,
    subTasks: [
      {
        title: "Check this",
        isComplete: false,
      },
    ],
  },

  {
    id: v4(),
    title: "First task",
    description: "This is my first task",
    dateAdded: "2024-05-25",
    endDate: "2024-05-28",
    startDate: "024-05-25",
    isComplete: false,
    subTasks: [
      {
        title: "Check this",
        isComplete: false,
      },
    ],
  },
];
