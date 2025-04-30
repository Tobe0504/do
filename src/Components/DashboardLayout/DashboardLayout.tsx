import SideNav from "../../Containers/SideNav/SideNav";
import classes from "./DashboardLayout.module.css";

type DashboardLayoutTypes = {
  children: React.ReactNode;
  className?: string;
};

const DashboardLayout = ({ children, className }: DashboardLayoutTypes) => {
  return (
    <main className={classes.container}>
      <SideNav />
      <section className={className}>{children}</section>
    </main>
  );
};

export default DashboardLayout;
