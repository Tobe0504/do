import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import {
  decryptData,
  encryptData,
  getLocalStorage,
  setLocalStorage,
} from "../HelperFunctions/decryptData";
import { tasksType } from "../Utilities/tasks";

interface TaskContextValues {
  taskState: tasksType[];
  setTaskState: Dispatch<SetStateAction<tasksType[]>>;
  recycleState: tasksType[];
  setRecycleState: Dispatch<SetStateAction<tasksType[]>>;
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
  const [recycleState, setRecycleState] = useState<tasksType[]>([]);
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
  const storedTodos = getLocalStorage("do-todos", "tasks");

  // Effects
  useEffect(() => {
    setLocalStorage(taskState, "do-todos", "tasks");
    setLocalStorage(recycleState, "do-recycle", "recycle");

    // eslint-disable-next-line
  }, [taskState, recycleState]);

  useEffect(() => {
    if (storedTodos) {
      getLocalStorage("do-todos", "tasks");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <TaskContext.Provider
      value={{
        taskState,
        setTaskState,
        newtaskState,
        setNewTaskState,
        recycleState,
        setRecycleState,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
