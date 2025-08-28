import classes from "./FileDisplayComponent.module.css";

interface Props {
  type: "file" | "image" | "audio" | "video";
  name: string;
}

const FileDisplayComponent: React.FC<Props> = ({ type = "file", name }) => {
  const icon =
    type === "image" ? (
      <span> 🎞️</span>
    ) : type === "video" ? (
      <span>📹</span>
    ) : type === "audio" ? (
      <span>🔉</span>
    ) : (
      <span> 🗃️</span>
    );
  return (
    <div className={classes.container}>
      <span>{icon}</span>
      <p>{name}</p>
    </div>
  );
};

export default FileDisplayComponent;
