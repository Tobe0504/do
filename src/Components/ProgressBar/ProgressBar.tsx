import classes from "./ProgressBar.module.css";

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className={classes.progressWrapper}>
      <div className={classes.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
