import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import { tasksType } from "../Utilities/tasks";

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
    percentageComplete: 0,
  });

  // Local
  const storedTodos = localStorage.getItem("do-todos");

  // Effects
  useEffect(() => {
    localStorage.setItem("do-todos", JSON.stringify(taskState));

    // eslint-disable-next-line
  }, [taskState]);

  useEffect(() => {
    if (storedTodos) {
      setTaskState(JSON.parse(storedTodos));
    }

    // eslint-disable-next-line
  }, []);

  return (
    <TaskContext.Provider
      value={{ taskState, setTaskState, newtaskState, setNewTaskState }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
