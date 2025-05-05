import DashboardLayoutRightSideBar from "../../Containers/DashboardLayoutRightSideBar/DashboardLayoutRightSideBar";
import Header from "../../Containers/Header/Header";
import SideNav from "../../Containers/SideNav/SideNav";
import classes from "./DashboardLayout.module.css";

type DashboardLayoutTypes = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  rightBarChild?: React.ReactNode;
  rightBarClassName?: string;
  openSidenav?: boolean;
};

const DashboardLayout = ({
  children,
  className,
  header,
  rightBarChild,
  rightBarClassName,
  openSidenav = false,
}: DashboardLayoutTypes) => {
  return (
    <main className={classes.container}>
      <SideNav />
      <section>
        <Header>{header}</Header>
        <section className={className}>{children}</section>
      </section>
      <DashboardLayoutRightSideBar
        className={`${rightBarClassName as string} ${
          openSidenav ? classes.rightOpen : classes.rightClosed
        }`}
      >
        {rightBarChild}
      </DashboardLayoutRightSideBar>
    </main>
  );
};

export default DashboardLayout;
