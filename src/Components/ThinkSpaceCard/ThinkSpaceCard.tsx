import { Telescope } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "../../Utilities/routes";
import classes from "./ThinkSpaceCard.module.css";

const ThinkSpaceCard = () => {
  return (
    <Link to={`${routes.THINK_SPACE}/1`} className={classes.container}>
      <img src="/images/think-space.png" alt="Think Space" />

      <div className={classes.textSection}>
        <div>
          <Telescope strokeWidth={2} size={14} color="#fff" />
        </div>
        <div>
          <h6>Canvas Title</h6>
          <p>Edited 2 days ago</p>
        </div>
      </div>
    </Link>
  );
};

export default ThinkSpaceCard;
