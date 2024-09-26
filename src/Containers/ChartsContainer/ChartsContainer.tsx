import classes from "./ChartsContainer.module.css";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../Components/Card/Card";

type ChartsContainerTypes = {
  summary: any[];
};

const ChartsContainer = ({ summary }: ChartsContainerTypes) => {
  return (
    <Card styleName={classes.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={summary || []}>
          <Tooltip />
          <Line
            type="bump"
            dataKey="taskCount"
            strokeWidth={2}
            stroke="#888888"
            activeDot={{ r: 4 }}
          />
          <Line
            type="bump"
            dataKey="numberComplete"
            stroke="#e63e21"
            strokeWidth={2}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartsContainer;
