import { Activity, CopyMinus, HeartHandshake, Telescope } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import { navItemTypes } from "../../Utilities/types";
import ThinkSpaceHeader from "../ThinkSpaceHeader/ThinkSpaceHeader";
import ThinkSpaceListItems from "../ThinkSpaceListItems/ThinkSpaceListItems";
import classes from "./ThinkSpace.module.css";

const ThinkSpace = () => {
  // States
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "Yours",
      id: "yours",
      icon: Activity,
      isActive: true,
    },
    {
      title: "Collaboratives",
      id: "collab",
      icon: HeartHandshake,
      isActive: false,
    },
    {
      title: "Acquired",
      id: "acquired",
      icon: Telescope,
      isActive: false,
    },
  ]);

  return (
    <DashboardLayout
      openSidenav={true}
      header={<ThinkSpaceHeader />}
      className={classes.container}
    >
      <SectionsNav navItems={navItems} setNavItems={setNavItems} />
      <ThinkSpaceListItems />
    </DashboardLayout>
  );
};

export default ThinkSpace;
