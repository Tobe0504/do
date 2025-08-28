import { Delete } from "@mui/icons-material";
import { Trash, Trash2 } from "lucide-react";
import Close from "../../Assets/Icons/Close";
import Button from "../Button/Button";
import classes from "./DeleteModalBody.module.css";

type DeleteModalBodyTypes = {
  title: string;
  caption: string;
  onClose: () => void;
  onDelete?: () => void;
};

const DeleteModalBody = ({
  title,
  caption,
  onClose,
  onDelete,
}: DeleteModalBodyTypes) => {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.imageSection}>
        <img
          src="https://res.cloudinary.com/dryjxk5jw/image/upload/v1756220101/__10_smwkns.jpg"
          alt={title}
        />
      </div>
      <div className={classes.container}>
        <h2>{title}</h2>
        <p>{caption}</p>
        <div className={classes.buttons}>
          <Button onClick={onDelete} type="delete">
            <Trash2 size={16} />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalBody;
