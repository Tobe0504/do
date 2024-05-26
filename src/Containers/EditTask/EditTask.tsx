import { Radio } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Input, { ReactQuillInput } from "../../Components/Input/Input";
import Layout from "../../Components/Layout/Layout";
import { TaskContext } from "../../Context/TaskContext";
import { tasksType } from "../../Utilities/tasks";
import classes from "../AddTask/AddTask.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router";

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
  const [subTasks, setSubTasks] = useState<any>([]);
  const [subTaskIsActive, setSubTaskIsActive] = useState(false);

  //   Utils
  const activeTask = taskState.find((task) => {
    return task.id === id;
  });

  const setTaskIsActive = (index: number) => {
    const subTaskCopy = subTasks.map((data: any, i: number) => {
      if (i === index) {
        return { ...data, isComplete: !data.isComplete };
      } else {
        return { ...data };
      }
    });
    setSubTasks(subTaskCopy);
  };

  const deleteTask = (index: number) => {
    const subTaskCopy = subTasks.filter((data: any, i: number) => {
      return i !== index;
    });
    setSubTasks(subTaskCopy);
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

  // Effects
  useEffect(() => {
    if (description) {
      setNewTaskState((prevState: tasksType) => {
        return { ...prevState, description };
      });
    }

    if (subTasks.length) {
      setNewTaskState((prevState: tasksType) => {
        return { ...prevState, subTasks };
      });
    }

    // eslint-disable-next-line
  }, [description, subTasks]);

  useEffect(() => {
    if (activeTask) {
      setNewTaskState(activeTask);
    }

    setDescription(activeTask?.description as string);
    setSubTasks(activeTask?.subTasks);

    // eslint-disable-next-line
  }, [activeTask]);

  useEffect(() => {
    if (subTasks?.length) {
      const activeLength = subTasks.filter((data: any) => {
        return data.isComplete;
      }).length;

      setNewTaskState((prevState) => {
        return {
          ...prevState,
          percentageComplete:
            (activeLength / (newtaskState?.subTasks?.length as number)) * 100,
        };
      });
    }

    // eslint-disable-next-line
  }, [subTasks]);

  return (
    <Layout>
      <Card styleName={classes.container}>
        <h4>Edit "{newtaskState.title}"</h4>

        <form>
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
          <div className={classes.subTaskSections}>
            {subTasks.map((data: any, i: number) => {
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
              placeholder="Eg. wash dishes..."
              onChange={(e) => {
                setSubTaskText(e.target.value);
              }}
              value={subTaskText}
              onKeyup={(e) => {
                e.preventDefault();
                if (subTaskText && e.key === "Enter") {
                  setSubTasks((prevState: any) => {
                    return [
                      ...prevState,
                      { title: subTaskText, isComplete: false },
                    ];
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

          <div className={classes.inputGroup}>
            <Input
              label="State date"
              type="date"
              placeholder="Eg. wash dishes..."
              name="startDate"
              onChange={inputHander}
              value={newtaskState.startDate}
            />
            <Input
              label="End date"
              type="date"
              placeholder="Eg. wash dishes..."
              name="endDate"
              onChange={inputHander}
              value={newtaskState.endDate}
              min={"31-05-2024"}
            />
          </div>

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
              });
              setDescription("");
              setSubTasks([]);

              navigate("/dashboard");
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
        </form>
      </Card>
    </Layout>
  );
};

export default EditTask;
