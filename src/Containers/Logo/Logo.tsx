import { useNavigate } from "react-router-dom";
import { routes } from "../../Utilities/routes";
import classes from "./Logo.module.css";

type LogoTypes = {
  onClick?: () => void;
};

const Logo = ({ onClick }: LogoTypes) => {
  // Router
  const navigate = useNavigate();

  return (
    <div
      className={classes.logoSection}
      onClick={() => {
        navigate(routes.BASE_URL);
        if (onClick) onClick();
      }}
    >
      <img
        // src="https://res.cloudinary.com/dgiropjpp/image/upload/v1746000565/Untitled_design__1_-removebg-preview_yysqk1.png"
        src="https://res.cloudinary.com/dmpdhnjqs/image/upload/v1759733038/Do/Red_Flower_Emblem_on_Black_reuvpr.png"
        alt="Logo"
        height={40}
        width={40}
      />
    </div>
  );
};

export default Logo;
