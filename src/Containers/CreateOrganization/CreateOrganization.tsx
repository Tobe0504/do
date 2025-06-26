import { images } from "../../Utilities/constants";
import CreateOrganizationForm from "../CreateOrganizationForm/CreateOrganizationForm";
import classes from "./CreateOrganization.module.css";

type CreateOrganizationTypes = {
  onClose: () => void;
};

const CreateOrganization = ({ onClose }: CreateOrganizationTypes) => {
  return (
    <section className={classes.container}>
      <CreateOrganizationForm onClose={onClose} />
      <div>
        <img src={images.addTodo} alt="Create Organization" />
      </div>
    </section>
  );
};

export default CreateOrganization;
