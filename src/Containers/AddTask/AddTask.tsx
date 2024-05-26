import { Radio } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Input, { ReactQuillInput } from "../../Components/Input/Input";
import Layout from "../../Components/Layout/Layout";
import { TaskContext } from "../../Context/TaskContext";
import { tasksType } from "../../Utilities/tasks";
import classes from "./AddTask.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { v4 } from "uuid";

const AddTask = () => {
  // Context
  const { newtaskState, setNewTaskState, setTaskState } =
    useContext(TaskContext);

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

  console.log(newtaskState, "Hmm");

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
  }, [description, subTasks]);

  return (
    <Layout>
      <Card styleName={classes.container}>
        <h4>Create a todo</h4>

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
              });
              setDescription("");
              setSubTasks([]);
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
        </form>
      </Card>
    </Layout>
  );
};

export default AddTask;
