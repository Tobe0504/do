import { forwardRef } from "react";
import { optionsType } from "../../Utilities/types";
import Button from "../Button/Button";
import classes from "./Options.module.css";

interface Props {
  options: optionsType[];
  main?: optionsType;
}

const Options = forwardRef<HTMLDivElement, Props>(({ options, main }, ref) => {
  const grouped = options.reduce<Record<string, optionsType[]>>(
    (acc, option) => {
      const group = option.group ?? "";
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    },
    {}
  );

  return (
    <div className={classes.options} ref={ref}>
      {Object.entries(grouped).map(([groupName, groupOptions]) => (
        <div key={groupName} className={classes.group}>
          <div className={classes.groupHeader}>{groupName}</div>
          {groupOptions.map((option) => (
            <div
              key={option.title}
              className={`${classes.option} ${
                option.title.toLowerCase().includes("delete")
                  ? classes.delete
                  : undefined
              }`}
              onClick={option.action}
            >
              {option?.icon && <span>{option.icon}</span>}
              <span>{option.title}</span>
            </div>
          ))}
        </div>
      ))}

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
