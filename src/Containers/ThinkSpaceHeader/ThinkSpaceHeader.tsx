import { EllipsisVertical, Search } from "lucide-react";
import Button from "../../Components/Button/Button";
import classes from "./ThinkSpaceHeader.module.css";

const ThinkSpaceHeader = () => {
  return (
    <header className={classes.container}>
      <h3>Think Spaces</h3>

      <div className={classes.inputSection}>
        <input
          type="search"
          placeholder="Search for any thoughts within your reach"
        />
        <Search size={16} className={classes.search} color="#a1a1a1" />
      </div>

      <Button type="null">
        <EllipsisVertical size={16} />
      </Button>
    </header>
  );
};

export default ThinkSpaceHeader;
