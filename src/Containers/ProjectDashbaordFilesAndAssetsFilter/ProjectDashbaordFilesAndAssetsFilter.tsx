import { Radio } from "@mui/material";
import Checkbox from "../../Components/Checkbox/Checkbox";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import classes from "./ProjectDashbaordFilesAndAssetsFilter.module.css";

const fileTypes = [
  { type: "Images", number: 23 },
  { type: "Videos", number: 5 },
  { type: "Documents", number: 4 },
  { type: "Code", number: 2 },
];

const tagTypes = [
  { type: "Design", number: 23 },
  { type: "Contract", number: 5 },
];

const ProjectDashbaordFilesAndAssetsFilter = () => {
  return (
    <div className={classes.container}>
      <div className={classes.types}>
        <h4>File Type</h4>
        {fileTypes.map((data) => {
          return (
            <div key={data?.type} className={classes.type}>
              <Checkbox />
              <p>
                {data?.type} <span>({data?.number})</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className={classes.types}>
        <h4>Tags</h4>
        {tagTypes.map((data) => {
          return (
            <div key={data?.type} className={classes.type}>
              <Checkbox />
              <p>
                {data?.type} <span>({data?.number})</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className={classes.types}>
        <h4>Made by</h4>
        {tagTypes.map((data) => {
          return (
            <div key={data?.type} className={classes.type}>
              <Checkbox />
              <p>
                {data?.type} <span>({data?.number})</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className={classes.progress}>
        <ProgressBar progress={20} />
        <p>20% Used</p>
      </div>
    </div>
  );
};

export default ProjectDashbaordFilesAndAssetsFilter;
