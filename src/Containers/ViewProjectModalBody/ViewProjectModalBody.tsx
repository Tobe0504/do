import Add from "../../Assets/Icons/Add";
import Close from "../../Assets/Icons/Close";
import Button from "../../Components/Button/Button";
import FilterOptions from "../../Components/FilterOptions/FilterOptions";
import Input from "../../Components/Input/Input";
import { images } from "../../Utilities/constants";
import classes from "../CreateProjectMldaBody/CreateProjectMldaBody.module.css";

const ViewProjectModalBody = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h4>Project Title</h4>
      </div>

      <form className={classes.form}>
        <Input placeholder="E.g. Revamp landing page" label="Project Name" />

        <Input
          placeholder="Briefly describe the project scope..."
          label="Description"
        />

        <Input type="date" label="Start Date" />

        <Input type="date" label="End Date" />

        <FilterOptions
          label="Squad assigned"
          options={[
            {
              text: "Design",
              image: images?.USER_AVATAR,
            },
            {
              text: "Engineering",
              image: images?.USER_AVATAR,
            },
            {
              text: "Marketing",
              image: images?.USER_AVATAR,
            },
          ]}
          isMultiple
        />

        <FilterOptions
          label="Tags"
          options={[
            {
              text: "Design",
            },
            {
              text: "Engineering",
            },
            {
              text: "Marketing",
            },
          ]}
          isMultiple
        />

        <FilterOptions
          label="Status"
          options={[
            {
              text: "Not Started",
            },
            {
              text: "In Progress",
            },
            {
              text: "Completed",
            },
          ]}
        />

        <div className={classes.actions}>
          <Button
            type="null"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Close />
            <span>Close</span>
          </Button>

          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Add />
            <span>Create Project</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ViewProjectModalBody;
