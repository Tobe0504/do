import Button from "../../Components/Button/Button";
import ThinkSpaceCard from "../../Components/ThinkSpaceCard/ThinkSpaceCard";
import classes from "./ThinkSpaceListItems.module.css";

const ThinkSpaceListItems = () => {
  return (
    <section className={classes.container}>
      {[...Array(12)].map((_) => {
        return <ThinkSpaceCard key={_} />;
      })}

      <div className={classes.loadButton}>
        <Button type="secondary">Load more</Button>
      </div>
    </section>
  );
};

export default ThinkSpaceListItems;
