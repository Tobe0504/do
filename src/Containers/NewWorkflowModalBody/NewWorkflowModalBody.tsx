import { Workflow } from "lucide-react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "./NewWorkflowModalBody.module.css";

const NewWorkflowModalBody = () => {
  return (
    <div className={classes.container}>
      <h4>Create New Workflow</h4>

      <form action="">
        <Input
          label="Workflow Name"
          tip="You can start assigning or moving tasks after creating this workflow"
        />

        <Button>
          <Workflow size={16} />
          Create workflow
        </Button>
      </form>
    </div>
  );
};

export default NewWorkflowModalBody;
