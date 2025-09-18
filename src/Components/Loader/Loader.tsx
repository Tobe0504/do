import { Loader as Loader3 } from "lucide-react";
import classes from "./Loader.module.css";

export const SmallLoader = () => {
  return (
    <div className={classes.container}>
      <Loader3 className="animate-spin" size={16} color="#e63e21" />
    </div>
  );
};

const Loader = () => {
  return <div className={classes.loader2}></div>;
};

export default Loader;
