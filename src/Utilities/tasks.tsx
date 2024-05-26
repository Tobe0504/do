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
  percentageComplete: number;
}
