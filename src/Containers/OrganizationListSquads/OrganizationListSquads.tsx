import SquadCard from "../../Components/SquadCard/SquadCard";
import { squads } from "../../Utilities/dummyData";
import classes from "../OrganizationListsProjects/OrganizationListsProjects.module.css";

const OrganizationListSquads = () => {
  return (
    <section className={classes.container}>
      {squads?.map((data, i) => {
        return <SquadCard {...data} key={i} />;
      })}
    </section>
  );
};

export default OrganizationListSquads;
