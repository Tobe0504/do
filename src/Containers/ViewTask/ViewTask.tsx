import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Layout from "../../Components/Layout/Layout";
import { TaskContext } from "../../Context/TaskContext";
import { tasksType } from "../../Utilities/tasks";

import Input from "../../Components/Input/Input";
import { Radio } from "@mui/material";
import Button from "../../Components/Button/Button";
import classes from "../AddTask/AddTask.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import task from "../../Assets/viewTask.jpeg";

const ViewTask = () => {
  // Context
  const { taskState } = useContext(TaskContext);

  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  const activeTask: tasksType | undefined = taskState.find((task) => {
    return task.id === id;
  });

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <h4> {activeTask?.title}</h4>

          <Input
            label="Title"
            name="title"
            value={activeTask?.title as string}
            readOnly
          />

          <label className={classes.label}>Description</label>
          <div
            dangerouslySetInnerHTML={{
              __html: activeTask?.description as string,
            }}
            className={classes.description}
          ></div>

          <div className={classes.subTaskSections}>
            <label className={classes.label}>Subtasks</label>
            {activeTask?.subTasks?.map((data: any, i: number) => {
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
                  />
                  <label htmlFor={data.title}>{data.title}</label>
                </div>
              );
            })}
          </div>

          <div className={classes.inputGroup}>
            <Input
              label="State date"
              type="date"
              name="startDate"
              value={activeTask?.startDate}
              readOnly
            />
            <Input
              label="End date"
              type="date"
              placeholder="Eg. wash dishes..."
              name="endDate"
              value={activeTask?.startDate}
              readOnly
            />
          </div>
          <div className={classes.buttonSection}>
            <Button
              onClick={() => {
                navigate(`/edit/${activeTask?.id}`);
              }}
            >
              <CreateOutlinedIcon />
              <span>Edit "{activeTask?.title}"</span>
            </Button>
          </div>
        </div>

        <div>
          <img src={task} alt="Add task" />
        </div>
      </div>
    </Layout>
  );
};

export default ViewTask;
