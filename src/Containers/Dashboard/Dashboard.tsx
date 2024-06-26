import Layout from "../../Components/Layout/Layout";
import classes from "./Dashboard.module.css";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardTodos from "../DashboardTodos/DashboardTodos";
import DashboardTaskCount from "../DashboardTaskCount/DashboardTaskCount";

const Dashboard = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <DashboardHeader />
        <div className={classes.todos}>
          <DashboardTodos />
          <DashboardTaskCount />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
