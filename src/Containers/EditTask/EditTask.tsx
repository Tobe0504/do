import { Radio } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import Button from "../../Components/Button/Button";
import Input, { ReactQuillInput } from "../../Components/Input/Input";
import Layout from "../../Components/Layout/Layout";
import { TaskContext } from "../../Context/TaskContext";
import {
  prerequisitesType,
  priorityType,
  subTasksType,
  tasksType,
} from "../../Utilities/tasks";
import classes from "../AddTask/AddTask.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import task from "../../Assets/editTask.jpg";
import { priotity } from "../AddTask/AddTask";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";
import { useGetTasks } from "../../Hooks/useGetTask";

const EditTask = () => {
  // Context
  const { newtaskState, taskState, setNewTaskState, setTaskState } =
    useContext(TaskContext);

  // Utils
  const inputHander = (e: any) => {
    setNewTaskState((prevState: tasksType) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Date
  const date = new Date();

  //   Router
  const { id } = useParams();
  const navigate = useNavigate();

  //   States
  const [description, setDescription] = useState("");
  const [subTaskText, setSubTaskText] = useState("");
  const [subTaskIsActive, setSubTaskIsActive] = useState(false);
  const [priorityState, setPriorityState] = useState<priorityType[]>([]);

  // Hooks
  const { getTasksDetails, getTaskProgress } = useGetTasks();

  // Memo
  const activeTask: tasksType | undefined = useMemo(
    () => getTasksDetails(id as string),

    // eslint-disable-next-line
    [taskState]
  );

  const tasks: prerequisitesType[] = useMemo(
    () => taskState?.filter((data) => data?.id !== id)?.map((data) => data?.id),

    // eslint-disable-next-line
    [taskState]
  );

  const setTaskIsActive = (index: number) => {
    const subTaskCopy = newtaskState?.subTasks?.map((data: any, i: number) => {
      if (i === index) {
        return { ...data, isComplete: !data.isComplete };
      } else {
        return { ...data };
      }
    });

    setNewTaskState((prevState) => {
      return {
        ...prevState,
        subTasks: subTaskCopy,
      };
    });
  };

  const deleteTask = (index: number) => {
    const filteredSubTasks = newtaskState?.subTasks?.filter(
      (_, i) => i !== index
    );

    setNewTaskState((prevState) => {
      return { ...prevState, subTasks: filteredSubTasks };
    });
  };

  const editTodo = () => {
    const taskCopy = taskState.map((data) => {
      if (data.id === id) {
        return newtaskState;
      } else {
        return { ...data };
      }
    });

    setTaskState(taskCopy);
  };

  // Memo

  // Effects
  useEffect(() => {
    if (newtaskState) {
      const percentageComplete = getTaskProgress(
        newtaskState?.subTasks as subTasksType[],
        newtaskState?.prerequisites as prerequisitesType[]
      );

      if (newtaskState?.percentageComplete !== percentageComplete) {
        setNewTaskState((prevState) => {
          return {
            ...prevState,
            percentageComplete,
          };
        });
      }
    }
    // eslint-disable-next-line
  }, [newtaskState]);

  useEffect(() => {
    const activePriority = priorityState.find((data) => data?.isActive);

    if (description) {
      setNewTaskState((prevState: tasksType) => {
        return { ...prevState, description };
      });
    }

    if (activePriority) {
      setNewTaskState((prevState: tasksType) => {
        return { ...prevState, priority: activePriority?.number || 0 };
      });
    }

    // eslint-disable-next-line
  }, [description, priorityState]);

  useEffect(() => {
    if (activeTask) {
      setNewTaskState(activeTask);
      setPriorityState(
        priotity?.map((data) => {
          if (data?.number === activeTask?.priority) {
            return { ...data, isActive: true };
          } else {
            return { ...data, isActive: false };
          }
        })
      );
      setDescription(activeTask?.description as string);
    }
    // eslint-disable-next-line
  }, [activeTask]);

  return (
    <Layout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <h4>Edit "{newtaskState.title}"</h4>

          <Input
            label="Title"
            placeholder="Eg. wash dishes..."
            name="title"
            onChange={inputHander}
            value={newtaskState.title}
          />
          <ReactQuillInput
            label="Description"
            placeholder="Eg. wash dishes..."
            setState={setDescription}
            state={description}
          />

          <div className={classes.prioritySection}>
            <p>Priority</p>
            <div className={classes.priorityInner}>
              {priorityState.map((data, i) => {
                return (
                  <div
                    key={data?.number}
                    onClick={() =>
                      activeToggler(i, priorityState, setPriorityState)
                    }
                    className={data?.isActive ? classes.active : undefined}
                  >
                    {data?.title}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={classes.subTaskSections}>
            {newtaskState?.subTasks?.map((data: any, i: number) => {
              return (
                <div className={classes.subTask} key={i}>
                  <Radio
                    name={data.title}
                    id={data.title}
                    checked={data.isComplete}
                    size="small"
                    sx={{
                      color: "#e63e21",
                      "&.Mui-checked": {
                        color: "#e63e21",
                      },
                    }}
                    onClick={() => {
                      setTaskIsActive(i);
                    }}
                  />
                  <label htmlFor={data.title}>{data.title}</label>
                  <span
                    onClick={() => {
                      deleteTask(i);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </span>
                </div>
              );
            })}
          </div>

          <div>
            <Input
              label="Subtasks"
              placeholder="Eg. wash more dishes..."
              onChange={(e) => {
                setSubTaskText(e.target.value);
              }}
              value={subTaskText}
              onKeyup={(e) => {
                e.preventDefault();
                if (subTaskText && e.key === "Enter") {
                  setNewTaskState((prevState) => {
                    return {
                      ...prevState,
                      subTasks: [
                        ...prevState.subTasks,
                        { title: subTaskText, isComplete: false },
                      ],
                    };
                  });

                  setSubTaskText("");
                }
              }}
              onBlur={() => {
                setSubTaskIsActive(false);
              }}
              onFocus={() => {
                setSubTaskIsActive(true);
              }}
              tip='Hit "Enter" to save a sub-task'
            />
          </div>

          {tasks?.length > 0 && (
            <div className={classes.prioritySection}>
              <p>Prerequisites</p>
              <div className={classes.priorityInner}>
                {tasks?.map((datum) => {
                  const data = getTasksDetails(datum as string);

                  const taskIsPrerequisite = newtaskState?.prerequisites?.find(
                    (pre) => pre === datum
                  );

                  return (
                    <div
                      key={data?.id}
                      onClick={() => {
                        if (taskIsPrerequisite) {
                          const filteredPre =
                            newtaskState?.prerequisites?.filter(
                              (pre) => datum !== pre
                            );
                          setNewTaskState((prevState: tasksType) => {
                            return {
                              ...prevState,
                              prerequisites: filteredPre,
                            };
                          });
                        } else {
                          setNewTaskState((prevState: tasksType) => {
                            const updatedState = { ...prevState };
                            updatedState.prerequisites = [
                              ...updatedState?.prerequisites,
                              datum,
                            ];

                            return updatedState;
                          });
                        }
                      }}
                      onDoubleClick={() => {
                        navigate(`/view/${data?.id}`);
                      }}
                    >
                      <span>{data?.title}</span>
                      {taskIsPrerequisite && (
                        <span>
                          {newtaskState?.prerequisites?.indexOf(datum) + 1}
                        </span>
                      )}
                      {(data?.percentageComplete as number) > 0 && (
                        <div
                          style={{
                            width: `${data?.percentageComplete}%`,
                            borderRadius:
                              data?.percentageComplete === 100
                                ? "10px 10px 10px 10px"
                                : "10px 0 0 10px",
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={classes.inputGroup}>
            <Input
              label="State date"
              type="datetime-local"
              placeholder="Eg. wash dishes..."
              name="startDate"
              onChange={inputHander}
              value={newtaskState.startDate}
            />
            <Input
              label="End date"
              type="datetime-local"
              placeholder="Eg. wash dishes..."
              name="endDate"
              onChange={inputHander}
              value={newtaskState.endDate}
              min={"31-05-2024"}
            />
          </div>
          <div className={classes.buttonSection}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                editTodo();
                setNewTaskState({
                  id: v4(),
                  title: "",
                  description: "",
                  subTasks: [],
                  dateAdded: date,
                  endDate: "",
                  isComplete: false,
                  startDate: "",
                  percentageComplete: 0,
                  priority: 0,
                  prerequisites: [],
                });
                setDescription("");

                navigate(`/view/${activeTask?.id}`);
              }}
              disabled={
                !newtaskState.title ||
                !newtaskState.description ||
                !newtaskState.startDate ||
                !newtaskState.endDate ||
                subTaskIsActive
              }
            >
              Submit
            </Button>
          </div>
        </form>

        <div>
          <img src={task} alt="View task" />
        </div>
      </div>
    </Layout>
  );
};

export default EditTask;
