import Logo from "../Logo/Logo";
import classes from "./Header.module.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useContext } from "react";
import { AuthUserContext } from "../../Context/AuthUserContext";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../HelperFunctions/decryptData";

const Header = () => {
  // Local
  const user = getLocalStorage("do-user-state", "userState");

  // context
  const { logout } = useContext(AuthUserContext);

  // Router
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Logo onClick={() => navigate("/dashboard")} />

      {user === "true" && (
        <span onClick={logout}>
          <LogoutOutlinedIcon />
        </span>
      )}
    </div>
  );
};

export default Header;
