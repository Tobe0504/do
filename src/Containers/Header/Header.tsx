import Logo from "../Logo/Logo";
import classes from "./Header.module.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useContext } from "react";
import { AuthUserContext } from "../../Context/AuthUserContext";

const Header = () => {
  // Local
  const user = localStorage.getItem("do-user");

  // context
  const { logout } = useContext(AuthUserContext);

  return (
    <div className={classes.container}>
      <Logo />

      {user && (
        <span onClick={logout}>
          <LogoutOutlinedIcon />
        </span>
      )}
    </div>
  );
};

export default Header;
