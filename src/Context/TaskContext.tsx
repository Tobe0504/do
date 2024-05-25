import { createContext, useEffect, useState } from "react";
import { tasks, tasksType } from "../Utilities/tasks";

interface TaskContextValues {
  taskState: tasksType[];
}

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext({} as TaskContextValues);

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  // States
  const [taskState, setTaskState] = useState<tasksType[]>(tasks);

  return (
    <TaskContext.Provider value={{ taskState }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
