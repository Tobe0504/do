import { AudioLines, Images, Video, File as Filee } from "lucide-react";
import React from "react";
import classes from "./File.module.css";

interface Props {
  type: "file" | "image" | "audio" | "video";
  name: string;
}

const File: React.FC<Props> = ({ type = "file", name }) => {
  const icon =
    type === "image" ? (
      <Images color="#e63e21" size={16} />
    ) : type === "video" ? (
      <Video color="#e63e21" size={16} />
    ) : type === "audio" ? (
      <AudioLines color="#e63e21" size={16} />
    ) : (
      <Filee color="#e63e21" size={16} />
    );

  return (
    <div className={classes.file}>
      <div>{icon}</div>
      <div>
        <h6>Design Mockup</h6>
        <p>1 hour ago</p>
      </div>
    </div>
  );
};

export default File;
