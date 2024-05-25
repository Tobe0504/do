export interface tasksType {
  title: string;
  description: string;
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
    title: "First task",
    description: "This is my first task",
    dateAdded: date,
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
    title: "First task",
    description: "This is my first task",
    dateAdded: "2024-05-25",
    endDate: "2024-05-28",
    isComplete: false,
    subTasks: [
      {
        title: "Check this",
        isComplete: false,
      },
    ],
  },
];
