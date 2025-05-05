import Add from "../../Assets/Icons/Add";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys } from "../../Utilities/constants";
import classes from "./NoOrganization.module.css";

const NoOrganization = () => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h2>🐝 Oops! No Hives Yet...</h2>
        <p>Let’s get the buzz going!</p>
      </div>
      <div className={classes.features}>
        <div>
          <h4>📣 Team Mentions</h4>
          <p>Notify Everybody</p>
        </div>

        <div>
          <h4>🏠 Team Hubs</h4>
          <p> Centralize work.</p>
        </div>

        <div>
          <h4>📊 Analytics</h4>
          <p> Track progress.</p>
        </div>
      </div>

      <Button
        onClick={() => {
          updateSearchParams(
            searchParamKeys.ORGANIZATIONS.KEY,
            searchParamKeys?.ORGANIZATIONS.CREATE,
            "set"
          );
        }}
      >
        <Add />
        <span>Create Your First Hive</span>
      </Button>
    </section>
  );
};

export default NoOrganization;
