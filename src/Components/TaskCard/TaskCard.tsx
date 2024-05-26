import { tasksType } from "../../Utilities/tasks";
import classes from "./TaskCard.module.css";
import moment from "moment";
import { useNavigate } from "react-router";

interface TaskCardProps {
  data: tasksType;
}

export const checkDate = (date: string) => {
  const inputDate = moment(date);
  const now = moment();

  if (inputDate.isBefore(now)) {
    return "past";
  } else if (inputDate.isAfter(now)) {
    return "future";
  } else {
    return "future";
  }
};

const TaskCard = ({ data }: TaskCardProps) => {
  const day = moment(data.dateAdded).format("MMM Do YY").split(" ")[1];
  const month = moment(data.dateAdded).format("MMM Do YY").split(" ")[0];
  const isActive = moment().diff(data.endDate);
  console.log(isActive);

  //   Navigate
  const navigate = useNavigate();

  return (
    <div
      className={classes.task}
      style={
        checkDate(data.endDate) === "past"
          ? { border: "1px solid #ff6166" }
          : {
              border: "1px solid #2e2e2e",
            }
      }
      onClick={() => {
        navigate(`/view/${data.id}`);
      }}
    >
      <div className={classes.upperSection}>
        <div className={classes.date}>
          <h4>{day}</h4>
          <span>{month}</span>
        </div>

        <div className={classes.date}>
          <h4>{data.title}</h4>
          <span dangerouslySetInnerHTML={{ __html: data.description }}></span>
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
};

export default TaskCard;
