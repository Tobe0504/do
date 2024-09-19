import { useContext } from "react";
import Card from "../../Components/Card/Card";
import { TaskContext } from "../../Context/TaskContext";
import classes from "./DashboardTaskCount.module.css";

const DashboardTaskCount = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  const activetasks = taskState.filter((data) => {
    return data.percentageComplete < 100;
  });

  return (
    <Card styleName={classes.container}>
      <h4>Active Projects</h4>

      <div>
        <h4>{String(activetasks.length)?.padStart(2, "0")}</h4>
        <svg
          width="151"
          height="151"
          viewBox="0 0 151 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="151"
            height="151"
            rx="38"
            fill="#E63E21"
            fillOpacity="0.1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.6518 61.2639C72.6719 61.0034 72.8891 60.8022 73.1504 60.8022H75.3599C75.6167 60.8022 75.8318 60.9969 75.8574 61.2525L77.3748 76.4272L88.0604 82.5333C88.2162 82.6223 88.3124 82.788 88.3124 82.9674V85.1476C88.3124 85.4773 87.9989 85.7167 87.6808 85.63L71.5235 81.2235C71.2921 81.1604 71.1381 80.9419 71.1565 80.7027L72.6518 61.2639Z"
            fill="#E63E21"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.8957 40.1789C57.6316 39.8642 57.1217 39.9846 57.0264 40.3843L52.6787 58.6113C52.6011 58.937 52.8591 59.2455 53.1934 59.2266L71.9437 58.164C72.3546 58.1407 72.563 57.6587 72.2985 57.3434L67.2148 51.2849C69.9449 50.352 72.8399 49.8647 75.8125 49.8647C90.4826 49.8647 102.375 61.7572 102.375 76.4272C102.375 91.0973 90.4826 102.99 75.8125 102.99C61.1424 102.99 49.25 91.0973 49.25 76.4272C49.25 73.9645 49.5835 71.5524 50.2338 69.2341L44.216 67.5462C43.4237 70.3708 43 73.3495 43 76.4272C43 94.5491 57.6907 109.24 75.8125 109.24C93.9343 109.24 108.625 94.5491 108.625 76.4272C108.625 58.3054 93.9343 43.6147 75.8125 43.6147C71.2542 43.6147 66.913 44.5442 62.9681 46.224L57.8957 40.1789Z"
            fill="#E63E21"
          />
        </svg>
      </div>
    </Card>
  );
};

export default DashboardTaskCount;
