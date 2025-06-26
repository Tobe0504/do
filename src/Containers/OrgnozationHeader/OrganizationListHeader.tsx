import Logo from "../Logo/Logo";
import classes from "./OrganizationListHeader.module.css";

const OrganizationListHeader = () => {
  return (
    <section className={classes.container}>
      <div>
        <Logo />
      </div>
      <div>
        <h1>New Company</h1>
        <p>The best company in the workd</p>
      </div>
    </section>
  );
};

export default OrganizationListHeader;
