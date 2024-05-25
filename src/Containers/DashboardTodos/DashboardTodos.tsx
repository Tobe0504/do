import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { TaskContext } from "../../Context/TaskContext";
import classes from "./DashboardTodos.module.css";

const DashboardTodos = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  function checkDate(date: string) {
    const inputDate = moment(date);
    const now = moment();

    if (inputDate.isBefore(now)) {
      return "past";
    } else if (inputDate.isAfter(now)) {
      return "future";
    } else {
      return "future";
    }
  }

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
        <h4>Activity</h4>
        <Link to="/">View all</Link>
      </div>

      <div className={classes.taskList}>
        {taskState?.slice(0, 4)?.map((data, i) => {
          const day = moment(data.dateAdded).format("MMM Do YY").split(" ")[1];
          const month = moment(data.dateAdded)
            .format("MMM Do YY")
            .split(" ")[0];
          const isActive = moment().diff(data.endDate);
          console.log(isActive);
          return (
            <div
              className={classes.task}
              key={i}
              style={
                checkDate(data.endDate) === "past"
                  ? { border: "1px solid red" }
                  : {
                      border: "1px solid #2e2e2e",
                    }
              }
            >
              <div className={classes.upperSection}>
                <div className={classes.date}>
                  <h4>{day}</h4>
                  <span>{month}</span>
                </div>

                <div className={classes.date}>
                  <h4>{data.title}</h4>
                  <span>{data.description}</span>
                </div>

                <div
                  style={
                    checkDate(data.endDate) === "past"
                      ? { background: "#c0c0c0", animation: "none" }
                      : {
                          background: "#E63E21",
                        }
                  }
                ></div>
              </div>
              <div className={classes.lowerSection}>
                <p>
                  {moment(data.dateAdded).calendar()} -{" "}
                  {moment(data.endDate).calendar()}
                </p>
                <p>{}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardTodos;
