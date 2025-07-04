import Add from "../../Assets/Icons/Add";
import Button from "../../Components/Button/Button";
import SquadCard from "../../Components/SquadCard/SquadCard";
import { squads } from "../../Utilities/dummyData";
import classes from "../OrganizationListsProjects/OrganizationListsProjects.module.css";

const OrganizationListSquads = () => {
  return (
    <section className={classes.outerContainer}>
      <div className={classes.header}>
        <div className={classes.input}>
          <input
            placeholder="Search by squad name, tag, or member"
            type="search"
          />
        </div>

        <div className={classes?.button}>
          <Button>
            <Add />
            <span>Create a squad</span>
          </Button>
        </div>
      </div>

      <div className={classes.container}>
        {squads?.map((data, i) => {
          return <SquadCard {...data} key={i} />;
        })}
      </div>
    </section>
  );
};

export default OrganizationListSquads;
