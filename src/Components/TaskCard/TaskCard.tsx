import { tasksType } from "../../Utilities/tasks";
import classes from "./TaskCard.module.css";
import moment from "moment";
import { useNavigate } from "react-router";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useRef, useState } from "react";

interface TaskCardProps {
  data: tasksType;
  onDbClick?: () => void;
}

export const checkDate = (date: string) => {
  const inputDate = moment(date);
  const now = moment();

  if (inputDate.isBefore(now)) {
    return "past";
  } else if (inputDate.isAfter(now)) {
    return "future";
  } else {
    return "okay";
  }
};

const TaskCard = ({ data, onDbClick }: TaskCardProps) => {
  const day = moment(data.dateAdded).format("MMM Do YY").split(" ")[1];
  const month = moment(data.dateAdded).format("MMM Do YY").split(" ")[0];

  //   Navigate
  const navigate = useNavigate();

  // States
  const [isDelete, setIsDelete] = useState(false);

  // ref
  const date = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const removeDropdownHandler = (e: any) => {
      if (date?.current && !date?.current?.contains(e.target)) {
        setIsDelete(false);
      } else {
      }
    };
    document.addEventListener("mousedown", removeDropdownHandler);

    return () => {
      document.removeEventListener("mousedown", removeDropdownHandler);
    };
  }, []);

  return (
    <div
      className={classes.task}
      style={
        checkDate(data.endDate) === "past"
          ? { border: "1px solid #ff6166" }
          : checkDate(data.startDate) === "future"
          ? { border: "1px solid #e63e215a" }
          : {
              border: "1px solid #2e2e2e",
            }
      }
      onClick={() => {
        navigate(`/view/${data.id}`);
      }}
    >
      <div className={classes.upperSection}>
        <div
          className={classes.date}
          onClick={(e) => {
            e.stopPropagation();
            setIsDelete(!isDelete);
          }}
          ref={date}
        >
          {!isDelete ? (
            <>
              <h4>{day}</h4>
              <span>{month}</span>{" "}
            </>
          ) : (
            <span onClick={onDbClick}>
              <DeleteOutlineOutlined />
            </span>
          )}
        </div>

        <div className={classes.date}>
          <h4>{data.title}</h4>
          <span dangerouslySetInnerHTML={{ __html: data.description }}></span>
        </div>

        <div
          style={
            checkDate(data.endDate) === "past"
              ? { background: "#c0c0c0", animation: "none" }
              : data.percentageComplete === 100
              ? { background: "green", animation: "none" }
              : checkDate(data.startDate) === "future"
              ? { background: "#e63e215a", animation: "none" }
              : {
                  background: "#E63E21",
                }
          }
        ></div>
      </div>
      <div className={classes.lowerSection}>
        <p>
          {moment(data.startDate).calendar()} -{" "}
          {moment(data.endDate).calendar()}
        </p>
      </div>
      <div
        className={classes.progressBar}
        style={{ width: `${data.percentageComplete || 0}%` }}
      ></div>
    </div>
  );
};

export default TaskCard;
