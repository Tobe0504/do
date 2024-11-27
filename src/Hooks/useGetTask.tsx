import { useContext } from "react";
import { priotity } from "../Containers/AddTask/AddTask";
import { TaskContext } from "../Context/TaskContext";
import { prerequisitesType, subTasksType } from "../Utilities/tasks";

export const useGetTasks = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  const getTasksDetails = (id: string) => {
    const taskDetail = taskState?.find((data) => data?.id === id);

    return taskDetail;
  };

  const getTaskProgress = (
    subTasks: subTasksType[],
    prerequisites: prerequisitesType[]
  ) => {
    const activeLength = subTasks.filter((data: any) => {
      return data.isComplete;
    }).length;

    const prereuisiteCompleteLength = prerequisites?.filter((datum) => {
      const data = getTasksDetails(datum as string);

      return data?.percentageComplete === 100;
    })?.length;

    const percentageComplete =
      ((activeLength + prereuisiteCompleteLength) /
        ((subTasks?.length + prerequisites?.length) as number)) *
      100;

    return percentageComplete;
  };

  const getActivePriority = (id: number) => {
    return priotity.find((data) => data?.number === id);
  };

  return { getTasksDetails, getTaskProgress, getActivePriority };
};
