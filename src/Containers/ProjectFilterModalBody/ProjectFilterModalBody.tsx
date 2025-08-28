import { FilterAlt } from "@mui/icons-material";
import { ListFilter } from "lucide-react";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import FilterOptions from "../../Components/FilterOptions/FilterOptions";
import { images } from "../../Utilities/constants";
import classes from "./ProjectFilterModalBody.module.css";

const ProjectFilterModalBody = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4>Filter Projects</h4>
      </div>

      <div>
        <FilterOptions
          label="By status"
          options={[
            { text: "Active" },
            { text: "Archived" },
            { text: "Completed" },
            { text: "On Hold" },
          ]}
        />
        <FilterOptions
          label="By squad"
          options={[
            { text: "Frontend Archers" },
            { text: "Backend" },
            { text: "Devops" },
          ]}
        />
        <FilterOptions
          label="By tags"
          options={[{ text: "Tasks" }, { text: "Backend" }, { text: "Devops" }]}
        />
        <FilterOptions
          label="By owner/creator"
          options={[
            { text: "Ezimorah Tobenna", image: images?.USER_AVATAR },
            { text: "Lead Ui", image: images?.USER_AVATAR },
            { text: "Devops Developer", image: images?.USER_AVATAR },
            { text: "Product Developer", image: images?.USER_AVATAR },
            { text: "QA Tester", image: images?.USER_AVATAR },
          ]}
        />

        <Button type="secondary">
          <ListFilter size={16} color="#fff" />
          <span>Filter</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilterModalBody;
