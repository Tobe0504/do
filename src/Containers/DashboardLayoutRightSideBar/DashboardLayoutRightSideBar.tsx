import Draggable from "../../Components/Draggable/Draggable";
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
    // <Draggable>
    <section className={`${className} ${classes.container}`}>
      {children}
    </section>
    // </Draggable>
  );
};

export default DashboardLayoutRightSideBar;
