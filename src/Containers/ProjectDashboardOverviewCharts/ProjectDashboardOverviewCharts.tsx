import classes from "./ProjectDashboardOverviewCharts.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import GradientCard from "../../Components/GradientCard/GradientCard";
import { Bubbles } from "lucide-react";
import MembersList from "../../Components/MembersList";
import { projects } from "../../Utilities/dummyData";

const ProjectDashboardOverviewCharts = () => {
  const value = 0.76;

  return (
    <div className={classes.container}>
      <GradientCard isActive>
        <div className={classes.progress}>
          <h4>Progress</h4>
          <CircularProgressbar
            value={value}
            maxValue={1}
            strokeWidth={6}
            text={`${value * 100}%`}
            counterClockwise
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "round",
              textSize: "12px",
              pathTransitionDuration: 0.2,
              pathColor: `#e63e21`,
              textColor: "#fff",
              trailColor: "#1b1b1b",
            })}
          />
          <p>
            <span>
              <Bubbles color="#e63e21" />
            </span>
            <span>
              This project might take longer due to this{" "}
              <a href="#0">problem</a>
            </span>
          </p>
        </div>
      </GradientCard>

      <div className={classes.teams}>
        <h4>Teams</h4>

        <div className={classes.team}>
          <MembersList members={projects?.[0]?.members} />
          <div>
            <h4>Frontend Team</h4>
          </div>
        </div>

        <div className={classes.team}>
          <MembersList members={projects?.[0]?.members} />
          <div>
            <h4>Design Team</h4>
          </div>
        </div>

        <div className={classes.team}>
          <MembersList members={projects?.[0]?.members} />
          <div>
            <h4>Solution Architects</h4>
          </div>
        </div>

        <div className={classes.team}>
          <MembersList members={projects?.[0]?.members} />
          <div>
            <h4>Data Analysts</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardOverviewCharts;
