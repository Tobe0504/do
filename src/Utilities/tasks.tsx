export interface tasksType {
  id: string | number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  subTasks: subTasksType[];
  isComplete: boolean;
  dateAdded: Date | number | string;
  percentageComplete: number;
  priority: number;
  prerequisites: prerequisitesType[];
}

export type prerequisitesType = string | number;

export type priorityType = {
  title: string;
  number: number;
  isActive: boolean;
};

export type subTasksType = {
  title: string;
  isComplete: boolean;
};
