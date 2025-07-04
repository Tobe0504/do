import { Delete } from "@mui/icons-material";
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
    <div className={classes.container}>
      <h2>{title}</h2>
      <p>{caption}</p>
      <div className={classes.buttons}>
        <Button onClick={onClose} type="null">
          <Close />
          <span>Close</span>
        </Button>
        <Button onClick={onDelete}>
          <Delete />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalBody;
