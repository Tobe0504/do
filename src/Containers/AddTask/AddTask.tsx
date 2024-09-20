import { Radio } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Input, { ReactQuillInput } from "../../Components/Input/Input";
import Layout from "../../Components/Layout/Layout";
import { TaskContext } from "../../Context/TaskContext";
import { tasksType } from "../../Utilities/tasks";
import classes from "./AddTask.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import task from "../../Assets/addTodo.jpeg";

const AddTask = () => {
  // Context
  const { newtaskState, setNewTaskState, setTaskState } =
    useContext(TaskContext);

  // Router
  const navigate = useNavigate();

  // Utils
  const inputHander = (e: any) => {
    setNewTaskState((prevState: tasksType) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Date
  const date = new Date();

  //   States
  const [description, setDescription] = useState("");
  const [subTaskText, setSubTaskText] = useState("");
  const [subTasks, setSubTasks] = useState<any>([]);
  const [subTaskIsActive, setSubTaskIsActive] = useState(false);

  //   Utils
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

  const submitTodo = () => {
    setTaskState((prevState) => {
      return [...prevState, newtaskState];
    });
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

  useEffect(() => {
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

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className={classes.container}>
        <form
          className={classes.innerContainer}
          onSubmit={(e) => e.preventDefault()}
        >
          <h4>Create a todo</h4>
          <Input
            label="Title"
            placeholder="Eg. wash dishes..."
            name="title"
            onChange={inputHander}
            value={newtaskState.title}
          />
          <ReactQuillInput
            label="Description"
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
              placeholder="Eg. wash more dishes..."
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
              placeholder="Eg. wash dishes..."
              name="startDate"
              onChange={inputHander}
              value={newtaskState.startDate}
              type="datetime-local"
            />
            <Input
              label="End date"
              placeholder="Eg. wash dishes..."
              name="endDate"
              onChange={inputHander}
              value={newtaskState.endDate}
              min={"31-05-2024"}
              type="datetime-local"
            />
          </div>
          <div className={classes.buttonSection}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                submitTodo();
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
              Add todo
            </Button>
          </div>
        </form>

        <div>
          <img src={task} alt="Add task" />
        </div>
      </div>
    </Layout>
  );
};

export default AddTask;
