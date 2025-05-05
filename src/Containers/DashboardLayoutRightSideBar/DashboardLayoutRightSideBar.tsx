import classes from "./DashboardLayoutRightSideBar.module.css";

type DashboardLayoutRightSideBarType = {
  children: React.ReactNode;
  className: string;
};

const DashboardLayoutRightSideBar = ({
  children,
  className,
}: DashboardLayoutRightSideBarType) => {
  return (
    <section className={`${className} ${classes.container}`}>
      {children}
    </section>
  );
};

export default DashboardLayoutRightSideBar;
