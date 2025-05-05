import DefaultHeader from "../DefaultHeader/DefaultHeader";
import classes from "./Header.module.css";

type HeaderTypes = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderTypes) => {
  return (
    <header className={classes.container}>
      {children || <DefaultHeader />}
    </header>
  );
};

export default Header;
