import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { TaskContext } from "../../Context/TaskContext";
import {
  deleteTask,
  restoreDeletedTask,
} from "../../HelperFunctions/deleteTask";
import { tasksType } from "../../Utilities/tasks";
import classes from "./DashboardTodos.module.css";

const DashboardTodos = () => {
  // Context
  const { taskState, recycleState, setTaskState, setRecycleState } =
    useContext(TaskContext);

  // States
  const [showRecycled, setShowRecycled] = useState(false);

  return (
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
        <h4>To-dos</h4>
        {taskState.length > 2 && <Link to="/todos">View all</Link>}
      </div>

      <div className={classes.taskList}>
        {!taskState?.length ? (
          <p className={classes.noTodo}>No todos added yet</p>
        ) : (
          taskState?.slice(0, 2)?.map((data, i) => {
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
              const recycle = localStorage.getItem("do-recycle");

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
    </Card>
  );
};

export default DashboardTodos;
