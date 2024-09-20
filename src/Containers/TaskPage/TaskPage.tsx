import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/Card/Card";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { TaskContext } from "../../Context/TaskContext";
import classes from "./TaskPage.module.css";
import {
  deleteTask,
  restoreDeletedTask,
} from "../../HelperFunctions/deleteTask";
import { tasksType } from "../../Utilities/tasks";
import Button from "../../Components/Button/Button";
import { getLocalStorage } from "../../HelperFunctions/decryptData";

const TaskPage = () => {
  // Context
  const { taskState, recycleState, setTaskState, setRecycleState } =
    useContext(TaskContext);

  // States
  const [showRecycled, setShowRecycled] = useState(false);

  return (
    <Layout>
      <Card styleName={classes.container}>
        <div className={classes.header}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="4.51221" r="4.5" fill="#C0C0C0" />
          </svg>
          <h4>Todos</h4>
        </div>

        <div className={classes.taskList}>
          {!taskState?.length ? (
            <p className={classes.noTodo}>No todos added yet</p>
          ) : (
            taskState?.map((data, i) => {
              return (
                <React.Fragment key={i}>
                  <TaskCard
                    data={data}
                    onDbClick={() => {
                      deleteTask(
                        taskState,
                        String(data.id),
                        setTaskState,
                        recycleState,
                        setRecycleState
                      );

                      setShowRecycled(true);
                    }}
                  />
                </React.Fragment>
              );
            })
          )}
        </div>

        {recycleState.length > 0 && showRecycled && (
          <div className={classes.restore}>
            A task was recently deleted. Do you want to{" "}
            <span
              onClick={() => {
                // Local storage
                const recycle = getLocalStorage("do-recycle", "recycle");

                const parsedRecycled = JSON.parse(
                  recycle as string
                ) as tasksType[];

                restoreDeletedTask(parsedRecycled[0], setTaskState);
                setShowRecycled(false);
              }}
            >
              restore task?
            </span>
          </div>
        )}

        <Button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 7.99854H8V12.9985C8 13.2638 7.89464 13.5181 7.70711 13.7056C7.51957 13.8932 7.26522 13.9985 7 13.9985C6.73478 13.9985 6.48043 13.8932 6.29289 13.7056C6.10536 13.5181 6 13.2638 6 12.9985V7.99854H1C0.734784 7.99854 0.48043 7.89318 0.292893 7.70564C0.105357 7.51811 0 7.26375 0 6.99854C0 6.73332 0.105357 6.47896 0.292893 6.29143C0.48043 6.10389 0.734784 5.99854 1 5.99854H6V0.998535C6 0.733319 6.10536 0.478964 6.29289 0.291428C6.48043 0.103892 6.73478 -0.00146484 7 -0.00146484C7.26522 -0.00146484 7.51957 0.103892 7.70711 0.291428C7.89464 0.478964 8 0.733319 8 0.998535V5.99854H13C13.2652 5.99854 13.5196 6.10389 13.7071 6.29143C13.8946 6.47896 14 6.73332 14 6.99854C14 7.26375 13.8946 7.51811 13.7071 7.70564C13.5196 7.89318 13.2652 7.99854 13 7.99854Z"
              fill="white"
            />
          </svg>
          <span>Create a new Todo</span>
        </Button>
      </Card>
    </Layout>
  );
};

export default TaskPage;
