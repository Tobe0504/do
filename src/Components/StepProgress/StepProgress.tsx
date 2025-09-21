import React from "react";
import { stepProgressType } from "../../Utilities/tasks";
import classes from "./StepProgress.module.css";

interface Props {
  title: string;
  steps: stepProgressType[];
}

const StepProgress: React.FC<Props> = ({ title, steps }) => {
  const activeStep = steps.find((s) => s.isActive) || steps[0];

  return (
    <div className={classes.container}>
      <span className={classes.title}>
        <span> {title}</span>
        <span>Current pipeline state: {activeStep?.title}</span>
      </span>
      <div className={classes.steps}>
        {steps.map((step, index) => (
          <div
            className={classes.progressBar}
            key={index}
            title={`${step.title}-${step.percentage}%`}
          >
            <div
              className={`${classes.step} ${
                step.isActive ? classes.active : ""
              }`}
              style={{
                backgroundColor: "#e63e21",
                width: `${step.percentage}%`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
