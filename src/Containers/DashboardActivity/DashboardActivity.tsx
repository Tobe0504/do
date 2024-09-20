import moment, { Moment } from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { checkDate } from "../../Components/TaskCard/TaskCard";
import { TaskContext } from "../../Context/TaskContext";
import classes from "./DashboardActivity.module.css";

const DashboardActivity = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  const [currentTime, setCurrentTime] = useState<Moment>(moment());

  //   Router
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    const timeOut = setInterval(() => {
      const timeNow = moment();
      setCurrentTime(timeNow);
    }, 1000);

    return () => {
      clearInterval(timeOut);
    };
  }, []);

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
      </div>

      {taskState
        ?.filter((data) => {
          return (
            checkDate(data.startDate) !== "future" &&
            checkDate(data?.endDate) !== "past"
          );
        })
        ?.map((task, i) => {
          const timeRemaining = moment(task.endDate).diff(task.startDate);
          const startMoment = moment(task?.startDate);
          const endMoment = moment(task?.endDate);
          const currentDifference =
            startMoment > currentTime
              ? 0
              : moment(currentTime).diff(startMoment);
          const endDifference =
            currentTime > endMoment ? 100 : moment(endMoment).diff(currentTime);
          const percentageTimePassed =
            (currentDifference / timeRemaining) * 100;
          const humanized = moment.duration(endDifference).humanize();

          return (
            <div
              className={classes.task}
              key={i}
              onClick={() => {
                navigate(`/view/${task?.id}`);
              }}
            >
              <div>
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 10.5C1 11.3284 1.67157 12 2.5 12H12.5C13.3284 12 14 11.3284 14 10.5V4.44118C14 3.61275 13.3284 2.94118 12.5 2.94118H6.2L4.68892 1.43694C4.40782 1.1571 4.02732 1 3.63067 1H2.5C1.67157 1 1 1.67157 1 2.5V10.5Z"
                    stroke="#E63E21"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <h4>{task.title}</h4>

              <div>{humanized} left</div>
              <div>
                <div
                  className={classes.progressBar}
                  style={{ width: `${percentageTimePassed}%` }}
                ></div>
              </div>
            </div>
          );
        })}
    </Card>
  );
};

export default DashboardActivity;
