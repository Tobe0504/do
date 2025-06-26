import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { projects } from "../../Utilities/dummyData";
import classes from "./OrganizationListsProjects.module.css";

const OrganizationListsProjects = () => {
  return (
    <section className={classes.container}>
      {projects.map((data, i) => {
        return <ProjectCard {...data} key={i} />;
      })}
    </section>
  );
};

export default OrganizationListsProjects;
