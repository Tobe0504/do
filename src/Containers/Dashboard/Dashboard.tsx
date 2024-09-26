import Layout from "../../Components/Layout/Layout";
import classes from "./Dashboard.module.css";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardTodos from "../DashboardTodos/DashboardTodos";
import DashboardTaskCount from "../DashboardTaskCount/DashboardTaskCount";
import ChartsContainer from "../ChartsContainer/ChartsContainer";
import DashboardActivity from "../DashboardActivity/DashboardActivity";
import dashboardFlower2 from "../../Assets/dashboardFlower2.jpeg";

const Dashboard = () => {
  // Local
  const localSummary = JSON.parse(localStorage.getItem("summary") as string);

  return (
    <Layout>
      <div className={classes.container}>
        <DashboardHeader />
        <div className={classes.todos}>
          <DashboardTodos />

          {localSummary?.length > 0 && (
            <ChartsContainer summary={localSummary} />
          )}
          <div>
            <img src={dashboardFlower2} alt="Flower" />
          </div>
        </div>
        <div className={classes.todos}>
          <DashboardActivity />
          <DashboardTaskCount />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
