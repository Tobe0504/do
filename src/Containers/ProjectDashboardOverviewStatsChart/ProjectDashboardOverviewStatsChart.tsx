import classes from "./ProjectDashboardOverviewStatsChart.module.css";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total Issues",
    data: 61,
  },
  {
    name: "Open",
    data: 17,
  },
  {
    name: "High",
    data: 4,
  },
  {
    name: "Resolved",
    data: 40,
  },
];

const ProjectDashboardOverviewStatsChart = () => {
  return (
    <div className={classes.container}>
      <ResponsiveContainer width="100%">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar
            dataKey="data"
            fill="#e63e21"
            radius={[5, 5, 0, 0]}
            activeBar={<Rectangle fill="#e63e2158" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectDashboardOverviewStatsChart;
