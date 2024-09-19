import classes from "./ChartsContainer.module.css";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../Components/Card/Card";
import { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { generateTaskSummary } from "../../HelperFunctions/generateDates";

const ChartsContainer = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  return (
    <Card styleName={classes.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={100}
          data={generateTaskSummary(taskState)}
        >
          <Tooltip />
          <Line
            type="bump"
            dataKey="taskCount"
            strokeWidth={2}
            stroke="#888888"
          />
          <Line
            type="bump"
            dataKey="numberComplete"
            stroke="#e63e21"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartsContainer;
