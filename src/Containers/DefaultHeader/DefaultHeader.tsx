import Logo from "../Logo/Logo";
import classes from "./DefaultHeader.module.css";

const DefaultHeader = () => {
  return (
    <div className={classes.container}>
      <Logo />
    </div>
  );
};

export default DefaultHeader;
