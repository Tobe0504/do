import { projects } from "../../Utilities/dummyData";
import classes from "./Activity.module.css";

const Activity = () => {
  return (
    <div className={classes.activity}>
      <img src={projects[0].members[0]} alt="Member" />
      <p>Tobe completed design creation and he has marked all as complete</p>
    </div>
  );
};

export default Activity;
