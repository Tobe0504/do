import { images } from "../../Utilities/constants";
import CreateOrganizationForm from "../CreateOrganizationForm/CreateOrganizationForm";
import classes from "./CreateOrganization.module.css";

const CreateOrganization = () => {
  return (
    <section className={classes.container}>
      <CreateOrganizationForm />
      <div>
        <img src={images.addTodo} alt="Create Organization" />
      </div>
    </section>
  );
};

export default CreateOrganization;
