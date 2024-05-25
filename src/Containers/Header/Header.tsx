import Logo from "../Logo/Logo";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.container}>
      <Logo />
    </div>
  );
};

export default Header;
