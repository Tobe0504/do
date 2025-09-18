import { AudioLines, File, Image, Video } from "lucide-react";
import classes from "./FileDisplayComponent.module.css";

interface Props {
  type: "file" | "image" | "audio" | "video";
  name: string;
}

const FileDisplayComponent: React.FC<Props> = ({ type = "file", name }) => {
  const icon =
    type === "image" ? (
      <Image size={20} color="#e63e21" />
    ) : type === "video" ? (
      <Video size={20} color="#e63e21" />
    ) : type === "audio" ? (
      <AudioLines size={20} color="#e63e21" />
    ) : (
      <File size={20} color="#e63e21" />
    );
  return (
    <div className={classes.container}>
      <span>{icon}</span>
      <p>{name}</p>
    </div>
  );
};

export default FileDisplayComponent;
