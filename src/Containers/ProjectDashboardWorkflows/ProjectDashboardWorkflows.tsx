import {
  Circle,
  CircleDotDashed,
  FileChartLine,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import Button from "../../Components/Button/Button";
import DeleteModalBody from "../../Components/DeleteModalBody/DeleteModalBody";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Modal from "../../Components/Modal/Modal";
import StepProgress from "../../Components/StepProgress/StepProgress";
import { AppContext } from "../../Context/AppContext";
import { capitalize } from "../../HelperFunctions/capitalize";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import { tasks } from "../../Utilities/dummyData";
import { stepProgressType } from "../../Utilities/tasks";
import { genericModalsTypes } from "../../Utilities/types";
import classes from "./ProjectDashboardWorkflows.module.css";

const pipelineData = [
  {
    name: "Product Research",
    speed: "delayed",
    tasks: tasks.slice(5),
    teamsAssigned: ["Product Team"],
  },
  {
    name: "Design Wireframe",
    speed: "quick",
    tasks: tasks,
    teamsAssigned: ["Design Team"],
  },
  {
    name: "API Consideration",
    speed: "average",
    tasks: tasks.slice(8),
    teamsAssigned: ["Backend Team", "Frontend Team"],
  },
  {
    name: "Prototyping",
    speed: "quick",
    tasks: tasks.slice(1),
    teamsAssigned: ["Design Team"],
  },
  {
    name: "UI Slicing",
    speed: "delayed",
    tasks: tasks,
    teamsAssigned: ["Frontend Team"],
  },
  {
    name: "API Integration",
    speed: "delayed",
    tasks: tasks.slice(2),
    teamsAssigned: ["Frontend Team", "Backend Team"],
  },
  {
    name: "Writing Tests",
    speed: "average",
    tasks: tasks.slice(7),
    teamsAssigned: ["Frontend Team"],
  },
  {
    name: "CI/CD Setup",
    speed: "delayed",
    tasks: tasks.slice(1),
    teamsAssigned: ["Devops Team"],
  },
  {
    name: "UAT",
    speed: "quick",
    tasks: tasks,
    teamsAssigned: ["Test Team"],
  },
  {
    name: "Legal and Compliance Review",
    speed: "delayed",
    tasks: tasks.slice(5),
    teamsAssigned: ["Legal Team"],
  },
  {
    name: "Content Creation",
    speed: "quick",
    tasks: tasks,
    teamsAssigned: ["Media Team"],
  },
  {
    name: "Final Report and Handover",
    speed: "average",
    tasks: tasks.slice(8),
    teamsAssigned: ["Management Team"],
  },
  {
    name: "Post-Project Retro",
    speed: "quick",
    tasks: tasks,
    teamsAssigned: ["All Teams"],
  },
];

const speedTypes = ["quick", "average", "delayed"];

const ProjectDashboardWorkflows = () => {
  const chartRef = useRef<null | HTMLDivElement>(null);
  const stageRefs = useRef<any>(pipelineData.map(() => React.createRef()));

  //   States
  const [lines, setLines] = useState([]);
  const [lineWidth, setLineWidth] = useState(0);
  const [modals, setModals] = useState<genericModalsTypes>({ delete: false });

  useEffect(() => {
    const updateLines = () => {
      if (!chartRef.current) return;

      const parentRect = (chartRef.current as any).getBoundingClientRect();
      const scrollLeft = (chartRef.current as any)?.scrollLeft;

      const positions = stageRefs.current
        .map((ref: any) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            return {
              x: rect.left - parentRect.left + rect.width / 2 + scrollLeft,
              y: rect.top - parentRect.top + rect.height / 2,
            };
          }
          return null;
        })
        .filter(Boolean);

      const newLines = [];
      for (let i = 0; i < positions.length - 1; i++) {
        const start = positions[i];
        const end = positions[i + 1];
        if (start && end) {
          newLines.push(
            <line
              key={i}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#a1a1a1"
              strokeWidth="2"
            />
          );
        }
      }
      setLines(newLines as any);
    };

    const handleResize = () => {
      if (chartRef.current) {
        setLineWidth(chartRef.current?.scrollWidth);
      }
    };

    updateLines();
    handleResize();
    window.addEventListener("resize", updateLines);
    (chartRef.current as any)?.addEventListener("scroll", updateLines);

    return () => {
      window.removeEventListener("resize", updateLines);
      (chartRef.current as any)?.removeEventListener("scroll", updateLines);
    };
  }, []);

  const steps: stepProgressType[] = useMemo(() => {
    return pipelineData?.map((pipeline) => {
      const doneCount = pipeline?.tasks?.filter(
        (task) => task.status === "done"
      ).length;

      const percentage =
        pipeline?.tasks?.length > 0
          ? (doneCount / pipeline.tasks.length) * 100
          : 0;

      const color =
        pipeline?.speed === "quick"
          ? "#219653"
          : pipeline?.speed === "average"
          ? "#a1a1a1"
          : "#780606";

      return {
        title: pipeline?.name,
        percentage,
        color,
        isActive: false,
      };
    });
  }, [pipelineData]);

  return (
    <>
      {modals.delete && (
        <Modal
          onClose={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              title="Delete Workflow?"
              caption="This action cannot be undone. Deleting this workflow will impact dependent tasks and integrations."
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}
      <section className={classes.outerContainer}>
        <div className={classes.header}>
          <h4>Project Pipelines</h4>

          <div className={classes.step}>
            <StepProgress title="Pipeline Progress" steps={steps} />
          </div>

          <div className={classes.actions}>
            <Dropdown
              options={speedTypes.map((data) => capitalize(data) as string)}
              label="Filter by Workflow Status"
            />
            <Button>
              <FileChartLine size={16} />
              <span>Generate Pipeline Report</span>
            </Button>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.chart} ref={chartRef}>
            <svg
              className={classes.chartLine}
              width={`${lineWidth}`}
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              {lines}
            </svg>

            {/* First column (labels) */}
            <div className={`${classes.chartRow} ${classes.chartTitles}`}>
              <div style={{ flex: "1" }}></div>
              <div>
                <span className="bg-[#219653]"></span>
                <span>Quick</span>
              </div>
              <div>
                <span className="bg-[#a1a1a1]"></span>
                <span>Average</span>
              </div>
              <div>
                <span className="bg-[#780606]"></span>
                <span> Delayed</span>
              </div>
              <div>Tasks Assigned</div>
              <div>Insights</div>
            </div>

            {pipelineData?.map((data, index) => {
              return (
                <div className={classes.chartRow} key={data?.name}>
                  <div
                    style={{
                      borderBottom:
                        data?.speed === "quick"
                          ? "4px solid #219653"
                          : data?.speed === "average"
                          ? "4px solid #a1a1a1"
                          : data?.speed === "delayed"
                          ? "4px solid #780606"
                          : "4px solid transparent",
                      flex: "1",
                    }}
                  >
                    <span>{data?.name}</span>

                    <Button type="tertiary" title="Add a new task">
                      <Plus
                        size={16}
                        className="cursor-pointer"
                        color="#a1a1a1"
                      />
                    </Button>

                    <Button
                      type="tertiary"
                      title="Delete workflow stage"
                      onClick={() => setModalTrue(setModals, "delete")}
                    >
                      <Trash2
                        size={16}
                        className="cursor-pointer"
                        color="#a1a1a1"
                      />
                    </Button>
                  </div>
                  {speedTypes.map((speed) => {
                    if (speed === data?.speed) {
                      return (
                        <div key={speed} ref={stageRefs.current[index]}>
                          <CircleDotDashed
                            color={
                              data?.speed === "quick"
                                ? "#219653"
                                : data?.speed === "average"
                                ? "#a1a1a1"
                                : "#780606"
                            }
                          />
                        </div>
                      );
                    } else {
                      return <div key={speed}></div>;
                    }
                  })}

                  <div className={`${classes.tasks} no-scroll-bar`}>
                    {data?.tasks?.map((task) => {
                      return (
                        <div className={classes.task} key={task.title}>
                          <Circle
                            fill={
                              task?.status === "not-started"
                                ? "#219653"
                                : task?.status === "in-progress"
                                ? "#e63e21"
                                : "#780606"
                            }
                            color={
                              task?.status === "not-started"
                                ? "#219653"
                                : task?.status === "in-progress"
                                ? "#e63e21"
                                : "#780606"
                            }
                            size={10}
                            className={`flex-shrink-0 ${
                              task.status === "in-progress" &&
                              "animate-pulse duration-2000"
                            }`}
                          />
                          <div>
                            <span>{task.title}</span>
                            <div>
                              {data?.teamsAssigned?.map((team) => {
                                return <span key={team}>{team}, </span>;
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDashboardWorkflows;
