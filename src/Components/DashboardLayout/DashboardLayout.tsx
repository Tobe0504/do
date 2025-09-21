import { useContext, useEffect, useRef, useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import DashboardLayoutRightSideBar from "../../Containers/DashboardLayoutRightSideBar/DashboardLayoutRightSideBar";
import Header from "../../Containers/Header/Header";
import SideNav from "../../Containers/SideNav/SideNav";
import classes from "./DashboardLayout.module.css";
import { AppContext } from "../../Context/AppContext";

type DashboardLayoutTypes = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  rightBarChild?: React.ReactNode;
  rightBarClassName?: string;
  openSidenav?: boolean;
  noHeader?: boolean;
  openSideNav?: boolean;
};

const DashboardLayout = ({
  children,
  className,
  header,
  rightBarChild,
  rightBarClassName,
  openSidenav = false,
  noHeader,
}: DashboardLayoutTypes) => {
  // States
  const [showTrigger, setShowTrigger] = useState(false);
  const [triggerY, setTriggerY] = useState(100);
  const [sideNavWidth, setSideNavWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(true);

  // Context
  const { sideNavIsOpened, setSideNavisOpened } = useContext(AppContext);

  // Refs
  const rightEdgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 👈 Left Edge Trigger
      if (e.clientX <= 100) {
        setShowTrigger(true);
        setTriggerY(e.clientY);
      } else {
        setShowTrigger(false);
      }

      const nearRightEdge = window.innerWidth - e.clientX <= 30;

      if (nearRightEdge) {
        if (!rightEdgeTimer.current) {
          rightEdgeTimer.current = setTimeout(() => {
            setSideNavisOpened(true);
          }, 500);
        }
      } else {
        if (rightEdgeTimer.current) {
          clearTimeout(rightEdgeTimer.current);
          rightEdgeTimer.current = null;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rightEdgeTimer.current) clearTimeout(rightEdgeTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = Math.max(150, Math.min(e.clientX, 500));
        setSideNavWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isResizing) setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <main className={classes.container}>
      <SideNav
        isOpen={sideNavIsOpened}
        toggleSideNav={() => setSideNavisOpened((prev) => !prev)}
        style={
          sideNavIsOpened ? { width: `${sideNavWidth}px` } : { width: "0px" }
        }
        onSetResizer={() => {
          setIsResizing(true);
        }}
      />

      <section>
        {!noHeader && <Header>{header}</Header>}
        <section className={className}>{children}</section>
      </section>

      <DashboardLayoutRightSideBar
        className={`${rightBarClassName ?? ""} ${
          openSidenav ? classes.rightOpen : classes.rightClosed
        }`}
      >
        {rightBarChild}
      </DashboardLayoutRightSideBar>

      {!sideNavIsOpened && (
        <div
          className={`${classes.openSideNav} ${
            showTrigger ? classes.openSideNavVisible : ""
          }`}
          style={{ top: triggerY - 17 }}
          onClick={() => setSideNavisOpened(true)}
        >
          <PanelLeftOpen size={18} />
        </div>
      )}
    </main>
  );
};

export default DashboardLayout;
