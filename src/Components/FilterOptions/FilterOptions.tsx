import { useState } from "react";
import classes from "./FilterOptions.module.css";

type FilterOptionsTypes = {
  options: { image?: string; text: string }[];
  label: string;
  isMultiple?: boolean;
};

const FilterOptions = ({
  options,
  label,
  isMultiple = false,
}: FilterOptionsTypes) => {
  // States
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  return (
    <div className={classes.container}>
      <label htmlFor={label}>{label}</label>
      <div>
        {options.map((data) => {
          return (
            <div
              onClick={() => {
                if (!isMultiple) {
                  if (selectedFilter?.includes(data?.text)) {
                    setSelectedFilter([]);
                  } else {
                    setSelectedFilter([data?.text]);
                  }
                } else {
                  if (selectedFilter?.includes(data?.text)) {
                    setSelectedFilter((prevState) => {
                      const updatedState = [...prevState];
                      const filtered = updatedState?.filter(
                        (text) => text !== data?.text
                      );
                      return filtered;
                    });
                  } else {
                    setSelectedFilter((prevState) => {
                      return [...prevState, data?.text];
                    });
                  }
                }
              }}
              className={
                selectedFilter?.includes(data?.text)
                  ? classes.active
                  : classes.inActive
              }
            >
              {isMultiple && selectedFilter?.includes(data?.text) && (
                <span className={classes.index}>
                  {selectedFilter?.indexOf(data?.text) + 1}
                </span>
              )}
              {data?.image && <img src={data?.image} width={16} height={16} />}
              <span className={classes.filterText}>{data?.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterOptions;
