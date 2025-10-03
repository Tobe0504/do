import { forwardRef } from "react";
import { optionsType } from "../../Utilities/types";
import Button from "../Button/Button";
import classes from "./Options.module.css";

interface Props {
  options: optionsType[];
  main?: optionsType;
}

const Options = forwardRef<HTMLDivElement, Props>(({ options, main }, ref) => {
  return (
    <div className={classes.options} ref={ref}>
      {options.map((option) => {
        return (
          <div
            key={`${option.title}`}
            className={
              option.title.toLowerCase().includes("delete")
                ? classes.delete
                : undefined
            }
            onClick={option.action}
          >
            {option?.icon && <span>{option?.icon}</span>}
            <span>{option.title}</span>
          </div>
        );
      })}

      {main && (
        <div className={classes.buttonSection}>
          <Button onClick={main?.action} type="secondary">
            <span>{main?.icon}</span>
            {main?.title}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Options;
