import { Dispatch, SetStateAction } from "react";
import { tasksType } from "../Utilities/tasks";

export const deleteTask = (
  task: tasksType[],
  id: string,
  setState: Dispatch<SetStateAction<tasksType[]>>,
  recycle?: tasksType[],
  setRecycle?: Dispatch<SetStateAction<tasksType[]>>
) => {
  const taskCopy = task.filter((data) => {
    return data.id !== id;
  });
  const deletedTask = task.find((data) => data.id === id);

  setState(taskCopy);

  if (setRecycle && recycle) {
    setRecycle([deletedTask as tasksType]);

    setTimeout(() => {
      deleteTask(recycle, deletedTask?.id as string, setRecycle);
    }, 120000);
  }
};

export const restoreDeletedTask = (
  task: tasksType,
  setTaskState: Dispatch<SetStateAction<tasksType[]>>
) => {
  if (task) {
    setTaskState((prevState) => {
      const updatedState = [...prevState];
      return [...updatedState, task];
    });
  }
};
