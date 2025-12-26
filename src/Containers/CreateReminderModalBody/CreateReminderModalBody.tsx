import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "./CreateReminderModalBody.module.css";

const CreateReminderModalBody = () => {
  return (
    <div className={classes.container}>
      <h4>Create a Reminder</h4>
      <form action="">
        <Input label="Reminder name" value="Infer from the chat" />
        <Input label="Reminder Date and Time" type="datetime-local" />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default CreateReminderModalBody;
