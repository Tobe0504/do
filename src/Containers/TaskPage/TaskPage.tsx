import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/Card/Card";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { TaskContext } from "../../Context/TaskContext";
import classes from "./TaskPage.module.css";

const TaskPage = () => {
  // Context
  const { taskState } = useContext(TaskContext);

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
                <React.Fragment>
                  <TaskCard data={data} />
                </React.Fragment>
              );
            })
          )}
        </div>
      </Card>
    </Layout>
  );
};

export default TaskPage;
