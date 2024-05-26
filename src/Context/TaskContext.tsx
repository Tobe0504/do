import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import { tasks, tasksType } from "../Utilities/tasks";

interface TaskContextValues {
  taskState: tasksType[];
  setTaskState: Dispatch<SetStateAction<tasksType[]>>;
  newtaskState: tasksType;
  setNewTaskState: Dispatch<SetStateAction<tasksType>>;
}

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext({} as TaskContextValues);

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  // Date
  const date = new Date();

  // States
  const [taskState, setTaskState] = useState<tasksType[]>([]);
  const [newtaskState, setNewTaskState] = useState<tasksType>({
    id: v4(),
    title: "",
    description: "",
    subTasks: [],
    dateAdded: date,
    endDate: "",
    isComplete: false,
    startDate: "",
  });

  return (
    <TaskContext.Provider
      value={{ taskState, setTaskState, newtaskState, setNewTaskState }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
